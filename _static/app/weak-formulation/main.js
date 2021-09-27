var fem_wf = new function() {
    //Dark/Light mode : propage from parent html
    document.body.dataset.theme= localStorage.getItem("theme");
    window.addEventListener('storage', () => {
        // Lorsque le stockage local change, vider la liste sur
        // la console.
        document.body.dataset.theme= localStorage.getItem("theme");
    });
    // Weak Formulation Generator

    // Factory
    class PDEQuantity{
        constructor(nchoices, current = 0){
        this.nchoices = parseInt(nchoices);
        this.current= parseInt(current);
        }
        isSet() {
            if(this.current !== 0){return true;}
        };
        nextStep(){
            this.current = (parseInt(this.current) + 1)%this.nchoices;
        }
    };
    // Differential Operator (PDE)
    class RigidityOperator extends PDEQuantity{
        constructor(pde_txt, wf_txt, lhs_coef, rhs_coef, nchoices, current = 0) {
            super(nchoices, current);
            this.pde_txt = pde_txt;
            this.wf_txt = wf_txt;
            this.lhs_coef = lhs_coef;
            this.rhs_coef = rhs_coef;
        }
    };
    class MassOperator extends PDEQuantity{
        constructor(pde_txt, wf_txt, coef, nchoices, current = 0) {
            super(nchoices, current);
            this.pde_txt = pde_txt;
            this.wf_txt = wf_txt;
            this.coef = coef;
        }
    };
    class PDEOperator extends PDEQuantity{
        constructor(pde_txt, wf_txt, nchoices, current = 0) {
            super(nchoices, current);
            this.pde_txt = pde_txt;
            this.wf_txt = wf_txt;
        }
    };
    //Boundary Condition
    class PDEBC extends PDEQuantity {
        constructor(pde_lhs, pde_rhs, wf_lhs, wf_rhs, nchoices, current = 0){
            super(nchoices, current );
            this.pde_rhs = pde_rhs;
            this.pde_lhs = pde_lhs;
            this.wf_rhs = wf_rhs;
            this.wf_lhs = wf_lhs;
        }
    };
    // 5 small blocks EDP vs. 7 small blocks in WF
    var RigidityMatrix = new RigidityOperator(["+0", "-\\Delta u", "-a\\Delta u", "+\\Delta u", "+a\\Delta "], ["", "\\int_{\\Omega} \\nabla u\\cdot\\nabla v", "a\\int_{\\Omega} \\nabla u\\cdot\\nabla v", "-\\int_{\\Omega} \\nabla u\\cdot\\nabla v", "-a\\int_{\\Omega} \\nabla u\\cdot\\nabla v"], ["", "-", "-a", "+","+a"], ["", "+", "+a", "-","-a"], 5, 1);
    var MassMatrix = new MassOperator(["+0", "+u", "+bu", "-u", "-bu"], ["", "\\int_{\\Omega} u v", "\\int_{\\Omega} u v","\\int_{\\Omega} u v","\\int_{\\Omega} u v"], ["", "+", "+b", "-","-b"], 5, 1);
    var RHS = new PDEOperator(["0", "f"], ["0","+\\int_{\\Omega} f v"], 2, 1);

    var NeumannBorder = new PDEBC(["\\partial_{\\mathbf{n}}u", "\\partial_{\\mathbf{n}}u", "\\partial_{\\mathbf{n}}u"], ["0", "g_{N}"], ["",""], ["", "\\int_{\\Gamma_N} g_N v"], 2,0);
    var DirichletBorder = new PDEBC(["\\partial_{\\mathbf{n}}u", "u", "u"], ["0", "0",  "g_D"], ["","",""], ["","",""], 3, 1);
    var FourierBorder = new PDEBC(["\\partial_{\\mathbf{n}}u", "\\partial_{\\mathbf{n}}u + \\alpha u" , "\\partial_{\\mathbf{n}}u + \\alpha u"], ["0", "0", "g_F"],["","\\alpha \\int_{\\Gamma_F} u v","\\alpha \\int_{\\Gamma_F} u v"],["","","\\int_{\\Gamma_F} g_F v"], 3, 1);
    
    // "parser"
    var keyToVar={
        "MassMatrix" : MassMatrix,
        "RigidityMatrix" : RigidityMatrix,
        "RHS" : RHS,
        "NeumannBorder" : NeumannBorder,
        "DirichletBorder" : DirichletBorder,
        "FourierBorder":FourierBorder,
    };

    this.nextStep = function(t){
        var pde_compo = keyToVar[t.dataset.component];
        pde_compo.nextStep();
        computeAll();
    };

    // Fill the PDE blocks with text/math
    var computePDE = function(){
        // Get every mutable component and set the content
        var elems = document.getElementsByClassName("PDEOperator");
        for (i = 0; i < elems.length; i++) {
            var op = keyToVar[elems[i].dataset.component];
            elems[i].innerHTML= "\\(" + op.pde_txt[op.current] + "\\)";
        }
        elems = document.getElementsByClassName("PDEBC");
        for (i = 0; i < elems.length; i++) {
            var bc = keyToVar[elems[i].dataset.component];
            elems[i].getElementsByTagName('td')[0].innerHTML= "\\(" + bc.pde_lhs[bc.current] + "\\)";
            elems[i].getElementsByTagName('td')[2].innerHTML= "\\(" + bc.pde_rhs[bc.current] + "\\)";            
        }
    };

    // Compute the Weak Formulation according to the PDE
    var computeWF = function(){
        // Reset the linear system
        var elems = document.getElementsByClassName("ls-operator");
        for (i = 0; i < elems.length; i++) {
            elems[i].innerHTML = "+0";
        }
        elems = document.getElementsByClassName("ls-bc");
        for (i = 0; i < elems.length; i++) {
            elems[i].innerHTML = "";
        }
        // What is the functionnal space ?
        var spaceFun = "H^1(\\Omega)";
        var unknown = "u";
        document.getElementById("dirichlet-extension").innerHTML="";
        if(DirichletBorder.isSet()){
            spaceFun = "\\class{dirichlet ls-compo}{H^1_D(\\Omega)}"; 
            document.getElementById("dirichlet-extension").innerHTML="\\(H^1_D(\\Omega)=\\left\\{u\\in H^1(\\Omega) ; u|_{\\Gamma_D}=0\\right\\}\\)";
            if(DirichletBorder.pde_rhs[DirichletBorder.current] != 0){
            document.getElementById("dirichlet-extension").innerHTML +="<br/>Avec, de plus,  \\(u := u + u_D\\) avec \\(u_D\\) un relèvement de \\(g_D\\)";
            }
        }
        // wf-equation
        var wf_LHS = ""; var wf_RHS = "";
        var ls_LHS =""; var ls_RHS="";
        if(RHS.isSet()){
            wf_RHS += "\\class{rhs wf-compo}{"+ RHS.wf_txt[RHS.current] +"}";
            ls_RHS += "\\class{rhs ls-compo}{"+ "B" +"}";
        }
        if(RigidityMatrix.isSet()){
            wf_LHS += "\\class{rigidity wf-compo}{"+RigidityMatrix.wf_txt[RigidityMatrix.current]+"}";
            ls_LHS += "\\class{rigidity ls-compo}{"+RigidityMatrix.rhs_coef[RigidityMatrix.current] + "D" +"}";
        }
        if(MassMatrix.isSet()){
            wf_LHS += "\\class{mass wf-compo}{" + MassMatrix.coef[MassMatrix.current]+ MassMatrix.wf_txt[MassMatrix.current]+"}";
            ls_LHS += "\\class{mass ls-compo}{" + MassMatrix.coef[MassMatrix.current]+"M"+"}";
        }
        if(RigidityMatrix.isSet()){
            // Neumann / Fourier condition can be visible
            if(NeumannBorder.wf_rhs[NeumannBorder.current])
            {
                wf_RHS += "\\class{wf-compo neumann}{" + RigidityMatrix.rhs_coef[RigidityMatrix.current]+ NeumannBorder.wf_rhs[NeumannBorder.current] +"}";
                ls_RHS += "\\class{ls-compo neumann}{" + RigidityMatrix.rhs_coef[RigidityMatrix.current]+"M_{\\Gamma_N}g_N" +"}";
            }
            if(FourierBorder.wf_lhs[FourierBorder.current])
            { 
                wf_LHS += "\\class{wf-compo fourier}{" + RigidityMatrix.rhs_coef[RigidityMatrix.current]+ FourierBorder.wf_lhs[FourierBorder.current] + "}";
                ls_LHS += "\\class{ls-compo fourier}{" + RigidityMatrix.rhs_coef[RigidityMatrix.current]+"\\alpha M_{\\Gamma_F}" + "}";
            }
            if(FourierBorder.wf_rhs[FourierBorder.current])
            {
                wf_RHS += "\\class{wf-compo fourier}{" + RigidityMatrix.rhs_coef[RigidityMatrix.current]+ FourierBorder.wf_rhs[FourierBorder.current] + "}";
                ls_RHS += "\\class{ls-compo fourier}{" + RigidityMatrix.rhs_coef[RigidityMatrix.current]+"M_{\\Gamma_F}g_F" + "}";
            }
        }

        // Concatenate LHS and RHS
        var equation = wf_LHS + " = " + wf_RHS;
        // Now fill 
        document.getElementById("math-weak-formulation").innerHTML = "\\( \\left\\\{\\begin{aligned}& \\text{Trouver }"+ unknown + "\\in "+spaceFun +"\\text{ tel que, }\\forall v\\in "+spaceFun +"\\\\ &"+ equation+"\\end{aligned}\\right.\\)";

        //Same for linear system
        var ls_equation = "\\left(" + ls_LHS + "\\right) U = " + ls_RHS;
        document.getElementById("math-linear-system").innerHTML = "\\(" +ls_equation +"\\)";
    };

    // Compute everything
    var computeAll = function(){
        computePDE();
        computeWF();
        MathJax.typeset();
    };

    // Fill the DOM at startup (do not launch MathJax!)
    computePDE();
    computeWF();

};