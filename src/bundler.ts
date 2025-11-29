import { resolve } from "node:path";
import { traverseModules } from "./traverseModules.ts";
import { emitCustomRequire } from "./emitCustomRequire.ts";
import { addEntryPointInvoke } from "./addEntrypointInvoke.ts";
import { addModulesCache } from "./addModulesCache.ts";

const entryPointURL = resolve(import.meta.dirname, "./testData/index.js");

traverseModules(entryPointURL);
emitCustomRequire();
addModulesCache();
addEntryPointInvoke(entryPointURL);
