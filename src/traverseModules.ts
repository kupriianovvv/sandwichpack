import { dirname } from "node:path";
import { getSourceCodeByURL } from "./getSourceCodeByURL.ts";
import { moduleResolve } from "./resolve.ts";
import { searchRequireCalls } from "./searchRequireCalls.ts";
import { addURLToModuleEntry } from "./addURLToModuleEntry.ts";
import { emitURLToModuleMap } from "./emitURLToModuleMap.ts";

export const traverseModules = (entryPointURL: string) => {
  const URLToModuleMap = {};
  const sourceCode = getSourceCodeByURL(entryPointURL);
  addURLToModuleEntry(entryPointURL, sourceCode, URLToModuleMap);
  const modulePaths = searchRequireCalls(sourceCode);
  traverseModulesRecursive(modulePaths, dirname(entryPointURL), URLToModuleMap);
  emitURLToModuleMap(URLToModuleMap);
};
const pathToURLMap: Record<string, string> = {};

const traverseModulesRecursive = (
  modulePaths: string[],
  base: string,
  URLToModuleMap: Record<string, string>
) => {
  const moduleURLs = modulePaths.map((modulePath) =>
    moduleResolve(modulePath, base)
  );
  for (let i = 0; i < modulePaths.length; i++) {
    pathToURLMap[modulePaths[i]] = moduleURLs[i];
  }
  moduleURLs.forEach((moduleURL, index) => {
    const sourceCode = getSourceCodeByURL(moduleURL);
    addURLToModuleEntry(moduleURL, sourceCode, URLToModuleMap);

    const newModulePaths = searchRequireCalls(sourceCode);
    traverseModulesRecursive(
      newModulePaths,
      dirname(moduleURL),
      URLToModuleMap
    );
    for (const key of Object.keys(URLToModuleMap)) {
      for (const [path, url] of Object.entries(pathToURLMap)) {
        URLToModuleMap[key] = URLToModuleMap[key].replaceAll(path, url);
      }
    }
  });
  return modulePaths;
};
