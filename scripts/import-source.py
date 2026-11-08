"""Import the standalone ROOTPFAD export without changing execution order."""

from pathlib import Path
import re
import sys
import subprocess

root = Path(__file__).resolve().parent.parent
source = Path(sys.argv[1]).read_text(encoding="utf-8")
source = source.replace("var STORAGE_KEY = 'ap1-expertenpfad-progress-v1';", "var STORAGE_KEY = window.RP_BOOT_USER ? 'rootpfad-user-'+window.RP_BOOT_USER.id+'-progress' : 'ap1-expertenpfad-progress-v1';")
source = source.replace('function mergeIn(data){\n  if(!data) return;', 'function mergeIn(data){\n  if(!data) return;\n  if(data.competencies){ state.competencies = state.competencies || {submissions:{},variants:{},feedback:{}}; ["submissions","variants","feedback"].forEach(function(k){ Object.assign(state.competencies[k], data.competencies[k] || {}); }); }',1)
source = source.replace('updatedAt: Date.now()', 'learning: state.learning || {events:{},missions:{}},\n    competencies: state.competencies || {submissions:{},variants:{},feedback:{}},\n    updatedAt: Date.now()', 1)
source = source.replace('function mergeIn(data){\n  if(!data) return;', 'function mergeIn(data){\n  if(!data) return;\n  if(data.learning){ state.learning = state.learning || {events:{},missions:{}}; Object.assign(state.learning.events, data.learning.events || {}); Object.assign(state.learning.missions, data.learning.missions || {}); }', 1)
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
html = html.replace('</body>', '<link rel="stylesheet" href="assets/learning-paths.css">\n<script src="assets/learning-paths.js"></script>\n<script src="assets/learning-bosses.js"></script>\n<script src="assets/learning-missions.js"></script>\n</body>')
html = html.replace('</body>', '<link rel="stylesheet" href="assets/admin.css">\n<script src="assets/accounts.js"></script>\n</body>')
html = html.replace('</body>', '<link rel="stylesheet" href="assets/guided-practice.css">\n<script src="assets/guided-practice-data.js"></script>\n<script src="assets/guided-practice.js"></script>\n</body>')
html = html.replace('</body>', '<link rel="stylesheet" href="assets/code-theme.css">\n<script src="assets/code-theme.js"></script>\n<script src="assets/quiz-depth.js"></script>\n</body>')
html = html.replace('</body>', '<script src="assets/quiz-learning-contracts.js"></script>\n</body>')
html = html.replace('</body>', '<script src="assets/module-assessments-data.js"></script>\n<script src="assets/competencies.js"></script>\n</body>')
html = html.replace('</body>', '<script src="assets/question-feedback.js"></script>\n</body>')
html = html.replace('</body>', '<script src="assets/spaced-variants.js"></script>\n</body>')
html = html.replace('</body>', '<script src="assets/source-review-data.js"></script>\n<script src="assets/source-review.js"></script>\n</body>')
html = html.replace('</body>', '<script src="assets/account-settings.js"></script>\n</body>')
html = html.replace('</body>', '<script src="assets/account-recovery.js"></script>\n</body>')
html = re.sub(r'<script src="(assets/[^"]+)"></script>', r'<script data-rp-src="\1" type="application/x-rootpfad"></script>', html)
html = html.replace('</body>', '<script src="assets/bootstrap.js"></script>\n</body>')
(root / "index.html").write_text(html, encoding="utf-8")
print(f"Imported {counts['style']} stylesheets and {counts['script']} scripts.")
if (root / "content/expertenpfade/data.json").exists():
    subprocess.run(["node", str(root / "scripts/build-experts.mjs"), "--cached"], check=True)
