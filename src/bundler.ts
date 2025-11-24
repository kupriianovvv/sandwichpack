import { resolve } from "node:path";
import { traverseModules } from "./traverseModules.ts";

const entryPointURL = resolve(import.meta.dirname, "./index.js");
traverseModules(entryPointURL);
