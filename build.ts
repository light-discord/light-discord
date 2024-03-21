import { build, type Options } from "tsup";

const tsupConfig: Options = {
  entryPoints: ["src/**/*.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  // bundle: false // I don't know why this is not working
};

await Promise.all([
    build({
        format: "cjs",
        outDir: "dist/cjs",
        target: "node14",
        ...tsupConfig
    })
])