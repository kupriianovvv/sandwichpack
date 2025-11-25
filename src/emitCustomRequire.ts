import { appendFileSync } from "node:fs";

const customRequire = (modulePath: string) => {
  const module = { exports: {} };

  //@ts-expect-error
  map[modulePath](sandwichpackRequire, module);
  return module.exports;
};

export const emitCustomRequire = () => {
  appendFileSync(
    "./src/bundle.js",
    `const sandwichpackRequire = ${customRequire.toString()};`
  );
};
