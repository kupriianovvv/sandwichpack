export const searchRequireCalls = (code: string) => {
  return [...code.matchAll(/require\(('|")(.*)('|")\)/g)].map(
    (item) => item[2]
  );
};
