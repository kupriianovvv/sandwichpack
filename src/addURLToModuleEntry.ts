const wrapSourceCodeIntoFunction = (sourceCode: string) => {
  return new Function("require", "module", sourceCode).toString();
};

export const addURLToModuleEntry = (
  moduleURL: string,
  sourceCode: string,
  URLToModuleMap: Record<string, string>
) => {
  URLToModuleMap[moduleURL] = wrapSourceCodeIntoFunction(sourceCode);
};
