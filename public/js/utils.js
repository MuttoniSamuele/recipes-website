export async function loadHtml(htmlFile, parent = null) {
  const res = await fetch(htmlFile);
  const html = await res.text();
  const element = (new DOMParser()).parseFromString(html, "text/html").body.firstChild;
  if (parent) {
    parent.appendChild(element);
  }
  return element;
}

export function parseUrl(url) {
  const [baseUrl, query] = url.split("?");
  const urlParams = baseUrl.split("/").slice(3).filter((v) => v !== "");
  let queryParams = {};
  if (query) {
    queryParams = Object.fromEntries(query.split("&").map((v) => {
      const [key, value] = v.split("=");
      return [key, value || null];
    }));
  }
  return [urlParams, queryParams];
}
