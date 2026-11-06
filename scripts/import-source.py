"""Import the standalone ROOTPFAD export without changing execution order."""

from pathlib import Path
import re
import sys
import subprocess

root = Path(__file__).resolve().parent.parent
source = Path(sys.argv[1]).read_text(encoding="utf-8")
assets = root / "assets"
assets.mkdir(exist_ok=True)
counts = {"style": 0, "script": 0}


def extract(match):
    tag, attributes, content = match.groups()
    # External scripts and non-JavaScript data blocks must stay untouched.
    if tag == "script" and (
        re.search(r"\bsrc\s*=", attributes, re.I)
        or re.search(r'type\s*=\s*[\"\']application/', attributes, re.I)
    ):
        return match.group(0)
    counts[tag] += 1
    extension = "css" if tag == "style" else "js"
    name = f"{tag}-{counts[tag]:02d}.{extension}"
    (assets / name).write_text(content, encoding="utf-8")
    if tag == "style":
        return f'<link rel="stylesheet" href="assets/{name}">'
    return f'<script{attributes} src="assets/{name}"></script>'


html = re.sub(
    r"<(style|script)\b([^>]*)>(.*?)</\1\s*>",
    extract,
    source,
    flags=re.DOTALL | re.IGNORECASE,
)
html = html.replace("<html>", '<html lang="de">', 1)
(root / "index.html").write_text(html, encoding="utf-8")
print(f"Imported {counts['style']} stylesheets and {counts['script']} scripts.")
if (root / "content/expertenpfade/data.json").exists():
    subprocess.run(["node", str(root / "scripts/build-experts.mjs"), "--cached"], check=True)
