export const root = new URL("../../", import.meta.url);
export const siteUrl = (path) => new URL(path, root).href;
export const resolveRoot = (value) =>
  typeof value === "string" &&
  /^(assets|pages|components)\/|^index\.html/.test(value)
    ? siteUrl(value)
    : value;
