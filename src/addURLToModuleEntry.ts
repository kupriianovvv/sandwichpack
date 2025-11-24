const wrapSourceCodeIntoFunction = (sourceCode: string) => {
  return new Function(sourceCode);
};

export const addURLToModuleEntry = (
  moduleURL: string,
  sourceCode: string,
  URLToModuleMap: Record<string, Function>
) => {
  URLToModuleMap[moduleURL] = wrapSourceCodeIntoFunction(sourceCode);
};
