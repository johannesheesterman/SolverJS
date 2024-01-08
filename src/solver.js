export class Solver{

    constructor(){
        this._variables = [];
        this._constraints = [];
    }

    newDomain(...values){
        return new Domain(values);
    }

    newVariable(name, domain){
        let newVariable = new Variable(name, domain);
        this._variables.push(newVariable);
        return newVariable;
    }

    newConstraint(expression, ...variables){
        let newConstraint = new Constraint(expression, variables);
        this._constraints.push(newConstraint);
        return newConstraint;
    }

    solve(){
        this._assignedVariables = [];
        return this.backtrack();
    }

    backtrack(){
        if(this._assignedVariables.length == this._variables.length){ return true; } // Assignment is completed.
        
        // Select unassigned variable. 
        // TODO: Variable selection should be optimized.       
        let variable = this._variables.find(v => !this._assignedVariables.some(av => av == v));
        let correspondingConstraints = this._constraints.filter(c => 
            c._variables.indexOf(variable) !== -1 &&
            c._variables.filter(v => v != variable).every(v => this._assignedVariables.indexOf(v) !== -1));

        for(let i = 0; i < variable._domain._values.length; i++){
            variable.value = variable._domain._values[i];
            if(correspondingConstraints.every(c => c.invoke())){
                this._assignedVariables.push(variable);
                let result = this.backtrack();
                if(result){
                    return true;
                } else {
                  return false;
                }
            }           
        }
        this._assignedVariables = this._assignedVariables.filter(av => av == variable);
        return false;
    }



}

class Domain{
    constructor(values){
        this._values = values;
    }
}

class Variable{
    constructor(name, domain){
        this._name = name;
        this._domain = domain;
        this.value = this._domain._values[0]; 
    }
}

class Constraint{
    constructor(expression, variables){
        this._variables = variables;
        this._expression = expression;
    }

    invoke(){
        return this._expression(...this._variables.map(v => v.value));
    }
}
