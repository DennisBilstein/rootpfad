// Sucht in allen von Git verfolgten Textdateien nach typischen Geheimnissen und lokalen Home-Pfaden.
// Ausgegeben werden nur Datei, Zeile und Muster, nie der gefundene Wert. Exit-Code 1 bei Funden.
// Ersetzt keinen Scan der Git-Historie: dafür gitleaks oder die GitHub-Secret-Scanning-Funktion verwenden.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const patterns = [
  ['Privater Schlüssel', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['AWS-Zugangsschlüssel', /AKIA[0-9A-Z]{16}/],
  ['GitHub-Token', /gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}/],
  ['Slack-Token', /xox[baprs]-[A-Za-z0-9-]{10,}/],
  ['Google-API-Schlüssel', /AIza[0-9A-Za-z_-]{35}/],
  ['Stripe-Live-Schlüssel', /sk_live_[0-9A-Za-z]{20,}/],
  ['Anthropic-/OpenAI-Schlüssel', /sk-(ant|proj)-[A-Za-z0-9_-]{20,}/],
  ['JWT', /eyJ[A-Za-z0-9_-]{15,}\.eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}/],
  ['Zugangsdaten in URL', /[a-z]+:\/\/[^/\s:@]+:[^/\s@]{3,}@[A-Za-z0-9.-]+\.[a-z]{2,}/],
  ['Bearer-Token', /Bearer [A-Za-z0-9._~+/-]{25,}/],
  ['Geheimnis-Zuweisung', /(password|passwd|secret|api[_-]?key|token)["']?\s*[:=]\s*["'][A-Za-z0-9/+_=.-]{16,}["']/i],
  ['Einladungs- oder Einrichtungslink', /#setup=[A-Za-z0-9_-]{16,}|invite[=/?][A-Za-z0-9_-]{16,}/],
  ['Lokaler Home-Pfad', /\/Users\/[a-z][a-z0-9._-]+\/|\/home\/[a-z][a-z0-9._-]+\//],
];
// Bekannte, geprüfte Fehlalarme: Mitschriften gescrapter Fremdseiten, Sperrdateien und Tests mit erfundenen Passwörtern (@example.test).
const skipFiles = /(^|\/)(package-lock\.json|composer\.lock)$|\.woff2$|^research_notes\/|^tests\/(accounts|passwords)\.spec\.mjs$/;

const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter((file) => file && !skipFiles.test(file));
const findings = [];
for (const file of files) {
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
  if (text.includes('\0')) continue;
  text.split('\n').forEach((line, index) => {
    for (const [name, pattern] of patterns) if (pattern.test(line)) findings.push(`${file}:${index + 1}  ${name}`);
  });
}

if (findings.length) { console.error(`${findings.length} Fund(e), Werte werden nicht ausgegeben:\n${findings.join('\n')}`); process.exit(1); }
console.log(`Keine Geheimnisse in ${files.length} verfolgten Dateien gefunden (Verlauf nicht geprüft).`);
