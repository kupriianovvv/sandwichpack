import { dirname } from "node:path";
import { getSourceCodeByURL } from "./getSourceCodeByURL.ts";
import { moduleResolve } from "./resolve.ts";
import { searchRequireCalls } from "./searchRequireCalls.ts";
import { addURLToModuleEntry } from "./addURLToModuleEntry.ts";
import { emitURLToModuleMap } from "./emitURLToModuleMap.ts";

export const traverseModules = (entryPointURL: string) => {
  const URLToModuleMap = {};
  const sourceCode = getSourceCodeByURL(entryPointURL);
  const modulePaths = searchRequireCalls(sourceCode);
  traverseModulesRecursive(modulePaths, dirname(entryPointURL), URLToModuleMap);
  emitURLToModuleMap(URLToModuleMap);
};
const traverseModulesRecursive = (
  modulePaths: string[],
  base: string,
  URLToModuleMap: Record<string, Function>
) => {
  const moduleURLs = modulePaths.map((modulePath) =>
    moduleResolve(modulePath, base)
  );
  moduleURLs.forEach((moduleURL, index) => {
    const sourceCode = getSourceCodeByURL(moduleURL);
    addURLToModuleEntry(modulePaths[index], sourceCode, URLToModuleMap);

    const newModulePaths = searchRequireCalls(sourceCode);
    traverseModulesRecursive(
      newModulePaths,
      dirname(moduleURL),
      URLToModuleMap
    );
  });
  return modulePaths;
};
