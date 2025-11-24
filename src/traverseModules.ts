import { dirname } from "node:path";
import { getSourceCodeByURL } from "./getSourceCodeByURL.ts";
import { moduleResolve } from "./resolve.ts";
import { searchRequireCalls } from "./searchRequireCalls.ts";

export const traverseModules = (entryPointURL: string) => {
  const sourceCode = getSourceCodeByURL(entryPointURL);
  const modulePaths = searchRequireCalls(sourceCode);
  traverseModulesRecursive(modulePaths, dirname(entryPointURL));
};
const traverseModulesRecursive = (modulePaths: string[], base: string) => {
  const moduleURLs = modulePaths.map((modulePath) =>
    moduleResolve(modulePath, base)
  );
  moduleURLs.forEach((moduleURL) => {
    const sourceCode = getSourceCodeByURL(moduleURL);
    const modulePaths = searchRequireCalls(sourceCode);

    traverseModulesRecursive(modulePaths, dirname(moduleURL));
  });
};
