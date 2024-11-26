
export class ResourceAlredyExistsError extends Error{
    constructor(resourceName:string){
        super(`there is already a ${resourceName} with this data`)
    }
}
