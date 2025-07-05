export function buildHrPath(path: string) {
    const base = process.env.NEXT_PUBLIC_HR_MODULE_PATH || "";
    // Normalize base to always start with a single slash and never end with a slash
    const normalizedBase = `/${base.replace(/^\/+|\/+$/g, "")}`;
    // If path already starts with normalized base, return as is
    if (path.startsWith(normalizedBase)) {
        return path;
    }
    // If path is already absolute (starts with '/'), just add base before it
    if (path.startsWith("/")) {
        return `${normalizedBase}${path}`.replace(/\/\/+/, "/");
    }
    // Otherwise, join base and path
    return `${normalizedBase}/${path}`.replace(/\/\/+/, "/");
}
