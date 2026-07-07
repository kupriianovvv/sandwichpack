# sandwichpack

A tiny JavaScript bundler written from scratch in TypeScript, to understand how tools like webpack work under the hood.

It takes an entry point with CommonJS `require()` calls, recursively walks the dependency graph, and emits a single `bundle.js` that runs without any module system.

## How it works

1. **Traverse** — starting from the entry point, find all `require()` calls in the source, resolve each path to an absolute URL, and repeat recursively for every discovered module.
2. **Module map** — wrap each module's source into a function and store it in a `URL -> module` map inside the bundle.
3. **Custom require** — emit a small runtime `require` implementation with a module cache, so each module is evaluated once and its `exports` are reused.
4. **Entry invoke** — append a call that requires the entry point, kicking everything off.

The result is one self-contained file: module map + runtime require + entry call.

## Run it

```bash
pnpm install
node src/bundler.ts   # bundles src/testData into src/bundle.js
node src/bundle.js    # run the bundle
```

## Limitations (it's a learning project)

- `require()` calls are found with a regex, not a real parser — so no AST, no handling of dynamic requires
- CommonJS only, no ESM
- No loaders, plugins, or tree-shaking

The point wasn't to compete with webpack — it was to stop treating bundlers as magic.
