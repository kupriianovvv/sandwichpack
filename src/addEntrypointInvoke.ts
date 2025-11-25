import { appendFileSync } from "node:fs";

export const addEntryPointInvoke = (entrypoint: string) => {
  appendFileSync(
    "./src/bundle.js",
    `sandwichpackRequire(${JSON.stringify(entrypoint)})`
  );
};
