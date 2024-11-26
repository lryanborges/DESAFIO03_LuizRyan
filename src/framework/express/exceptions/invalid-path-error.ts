
export class InvalidPathError extends Error {
    constructor(){
        super("The path for the router descriptor must not start with '/'")
    }
}
