import { readFileSync } from "node:fs";

export const getSourceCodeByURL = (url: string) => {
  const sourceCode = readFileSync(url).toString();
  return sourceCode;
};
