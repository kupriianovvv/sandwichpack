import { appendFileSync } from "fs";

export const addModulesCache = () => {
  appendFileSync("./src/bundle.js", "const modulesCache = {};");
};
