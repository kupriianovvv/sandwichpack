//@ts-nocheck
import { appendFileSync } from "node:fs";

const customRequire = (modulePath: string) => {
  if (modulesCache[modulePath]) {
    return modulesCache[modulePath].exports;
  }
  const module = { exports: {} };
  modulesCache[modulePath] = module;
  map[modulePath](sandwichpackRequire, module);

  return module.exports;
};

export const emitCustomRequire = () => {
  appendFileSync(
    "./src/bundle.js",
    `const sandwichpackRequire = ${customRequire.toString()};`
  );
};
