const parser = new DOMParser();

export default async function loadHtml(htmlFile, parent = null) {
  const res = await fetch(htmlFile);
  const html = await res.text();
  const element = parser.parseFromString(html, "text/html").body.firstChild;
  if (parent) {
    parent.appendChild(element);
  }
  return element;
}
