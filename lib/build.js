#! /usr/bin/env node

const { GasPlugin } = require("esbuild-gas-plugin");

require("esbuild")
  .build({
    entryPoints: [process.argv[2]],
    bundle: true,
    outfile: "bundle.js",
    plugins: [GasPlugin],
  })
  .catch(() => process.exit(1));
