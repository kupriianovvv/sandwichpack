import { appendFileSync, writeFileSync } from "node:fs";

export const emitURLToModuleMap = (URLToModuleMap: Record<string, string>) => {
  const data: Record<string, string> = {};
  writeFileSync("./src/bundle.js", "const map = {\n");
  for (const [moduleUrl, func] of Object.entries(URLToModuleMap)) {
    data[moduleUrl] = func.toString();
    const key = `${moduleUrl}`;
    const formattedKey = JSON.stringify(key);
    appendFileSync("./src/bundle.js", `${formattedKey}: ${func.toString()},`);
  }
  appendFileSync("./src/bundle.js", "}");
};
