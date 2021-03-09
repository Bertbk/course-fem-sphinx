var fem_wf = new function() {
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
    var RigidityMatrix = new RigidityOperator(["+0", "-Δu", "-aΔu", "+Δu", "+aΔ"], ["", "∫<sub>Ω</sub> ∇u·∇v", "a∫<sub>Ω</sub> ∇u·∇v", "-∫<sub>Ω</sub> ∇u·∇v", "-a∫<sub>Ω</sub> ∇u·∇v"], ["", "-", "-a", "+","+a"], ["", "+", "+a", "-","-a"], 5, 1);
    var MassMatrix = new PDEOperator(["+0", "+u", "+bu", "-u", "-bu"], ["", "+∫<sub>Ω</sub> u v", "+b∫<sub>Ω</sub> u v","-∫<sub>Ω</sub> u v","-b∫<sub>Ω</sub> u v"], 5, 1);
    var RHS = new PDEOperator(["0", "f"], ["0","+∫<sub>Ω</sub> f v"], 2, 1);

    var NeumannBorder = new PDEBC(["∂<sub>n</sub> u", "∂<sub>n</sub> u", "∂<sub>n</sub> u"], ["0", "g<sub>N</sub>"], ["",""], ["", "∫<sub>Γ<sub>N</sub></sub> g<sub>N</sub> v"], 2,1);
    var DirichletBorder = new PDEBC(["∂<sub>n</sub> u", "u", "u"], ["0", "0",  "g<sub>D</sub>"], ["","",""], ["","",""], 3, 1);
    var FourierBorder = new PDEBC(["∂<sub>n</sub>u", "∂<sub>n</sub>u + αu" , "∂<sub>n</sub>u + αu"], ["0", "0", "g<sub>F</sub>"],["","α∫<sub>Γ<sub>F</sub></sub> u v","α∫<sub>Γ<sub>F</sub></sub> u v"],["","","∫<sub>Γ<sub>F</sub></sub> g<sub>F</sub> v"], 3, 1);
    
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
            elems[i].innerHTML= op.pde_txt[op.current];
        }
        elems = document.getElementsByClassName("PDEBC");
        for (i = 0; i < elems.length; i++) {
            var bc = keyToVar[elems[i].dataset.component];
            elems[i].getElementsByTagName('td')[0].innerHTML= bc.pde_lhs[bc.current];
            elems[i].getElementsByTagName('td')[2].innerHTML= bc.pde_rhs[bc.current];            
        }
    };

    // Compute the Weak Formulation according to the PDE
    var computeWF = function(){
        // What is the functionnal space ?
        var spaceFun = "H<sup>1</sup>(Ω)";
        var unknown = "u";
        if(DirichletBorder.isSet()){
            spaceFun = "H<sup>1</sup><sub>D</sub>(Ω)"; 
            unknown = "u<sub>t</sub>"; 
        }
        // wf-equation
        var equation = "";
        var wf_LHS = "";
        var wf_RHS = "";
        if(RigidityMatrix.isSet()){
            wf_LHS += RigidityMatrix.wf_txt[RigidityMatrix.current];
            // Neumann / Fourier condition can be visible
            if(NeumannBorder.wf_rhs[NeumannBorder.current])
            {wf_RHS += RigidityMatrix.rhs_coef[RigidityMatrix.current]+ NeumannBorder.wf_rhs[NeumannBorder.current];}
            if(FourierBorder.wf_lhs[FourierBorder.current])
            { wf_LHS += RigidityMatrix.lhs_coef[RigidityMatrix.current]+ FourierBorder.wf_lhs[FourierBorder.current];}
            if(FourierBorder.wf_rhs[FourierBorder.current])
            {wf_RHS += RigidityMatrix.rhs_coef[RigidityMatrix.current]+ FourierBorder.wf_rhs[FourierBorder.current];}
        }
        if(MassMatrix.isSet()){
            wf_LHS += MassMatrix.wf_txt[MassMatrix.current];
        }
        equation += " = ";
        if(RHS.isSet()){
            wf_RHS += RHS.wf_txt[RHS.current];
        }
        equation = wf_LHS + " = " + wf_RHS;
        // Now fill
        document.getElementById("wf-space").innerHTML = spaceFun;
        document.getElementById("wf-unknown").innerHTML = unknown;
        document.getElementById("wf-equation").innerHTML = equation;
    };

    // Compute everything
    var computeAll = function(){
        computePDE();
        computeWF();
    };
    // Run it at startup
    computeAll();

};