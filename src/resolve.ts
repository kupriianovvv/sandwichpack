import { resolve } from "node:path";

export const moduleResolve = (path: string, base: string) => {
  return resolve(base, path);
};
