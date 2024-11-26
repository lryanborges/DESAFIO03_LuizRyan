import * as esbuild from "esbuild"

await esbuild.build({
    entryPoints: ["./src/main.ts","./src/script.ts"],
    bundle: true,
    platform: "node",
    outdir: ".build",
    packages: "external",
    format: "esm",
    sourcemap: true,
    alias: {
        "@*": "./src/*"
    }
})
