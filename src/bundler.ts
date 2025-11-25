import { resolve } from "node:path";
import { traverseModules } from "./traverseModules.ts";
import { emitCustomRequire } from "./emitCustomRequire.ts";
import { addEntryPointInvoke } from "./addEntrypointInvoke.ts";

const entryPointURL = resolve(import.meta.dirname, "./index.js");
traverseModules(entryPointURL);
emitCustomRequire();
addEntryPointInvoke(entryPointURL);
