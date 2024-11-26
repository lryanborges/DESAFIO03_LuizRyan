
export class EnvNotFoundError extends Error{
    constructor(variableName:string){
        super(`The ${variableName} was not provided!!!`)
    }
}
