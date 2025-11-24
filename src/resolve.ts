import { resolve } from "node:path";

export const moduleResolve = (path: string, base: string) => {
  const moduleURL = resolve(base, path);
  return moduleURL.endsWith(".js") ? moduleURL : `${moduleURL}.js`;
};
