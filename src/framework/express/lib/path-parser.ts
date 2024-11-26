import { InvalidPathError } from "../exceptions/invalid-path-error.js"

export function pathParser({ base, path }: { base: string; path: string }): string {
    const isValid = !path.startsWith("/") || !base.startsWith("/") || !base.endsWith("/")
    if (!isValid) throw new InvalidPathError()
    return base + path
}
