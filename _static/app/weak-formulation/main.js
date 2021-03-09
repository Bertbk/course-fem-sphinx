var fem_wf = new function() {
    // Weak Formulation Generator

    // Factory
    function Compo(choices, nchoices, current = 0) {
        this.choices = choices;
        this.nchoices = nchoices;
        this.current= current;
      };
    Compo.prototype.isSet = function() {
        if(this.current != "0"){return true;}
    };
    Compo.prototype.nextStep = function(){
        this.current = (parseInt(this.current) + 1)%this.nchoices;
    };

    // 5 small blocks EDP vs. 7 small blocks in WF
    var RigidityMatrix = new Compo({"0" : "+0", "1": "+Δu", "2": "+aΔu","3": "-Δu","4": "-aΔ"}, 5, 1);
    var MassMatrix = new Compo({"0" : "+0", "1": "+u", "2": "+bu","3": "-u","4": "-bu"}, 5, 1);
    var RHS = new Compo({"0" : "0", "1": "f", "2": "-f"}, 3, 1);
    var NeumannBorder = new Compo({"0" : "∂<sub>n</sub> u = 0", "1" : "∂<sub>n</sub>u = g", "2" : "∂<sub>n</sub>u = -g"}, 3);
    var DirichletBorder = new Compo({"0" : "∂<sub>n</sub> u = 0", "1" : "u = 0", "2" : "u = g"}, 3, 1);
    var FourierBorder = new Compo({"0" : "∂<sub>n</sub>u = 0", "1" : "∂<sub>n</sub>u + αu = 0" , "2" : "∂<sub>n</sub>u + αu = g"}, 2, 1);
    
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
        var compo = keyToVar[t.dataset.component];
        compo.nextStep();
        computeAll();
    };

    // Fill the PDE blocks with text/math
    var computePDE = function(){
        // Get every mutable component and set the content
        var elems = document.getElementsByClassName("pde_quantity");
        for (i = 0; i < elems.length; i++) {
            var compo = keyToVar[elems[i].dataset.component];
            elems[i].innerHTML= compo.choices[compo.current];
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
            wf_LHS += "+∫<sub>Ω</sub> ∇u·∇v";
            // Neumann / Fourier condition can be visible
            if(NeumannBorder.isSet())
            {
                wf_RHS +="+∫<sub>Γ<sub>N</sub></sub> g v";
            }
            if(FourierBorder.isSet())
            {
                wf_LHS +="+α∫<sub>Γ<sub>F</sub></sub> u v";
                wf_RHS +="+∫<sub>Γ<sub>F</sub></sub> g v";
            }
        }
        if(MassMatrix.isSet()){
            wf_LHS += "+∫<sub>Ω</sub> u v";
        }
        equation += " = ";
        if(RHS.isSet()){
            wf_RHS += "+∫<sub>Ω</sub> f v";
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