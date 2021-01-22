const fs = require("fs");
const path = require("path");
const process = require("process");
const convert = require("./convert");
const combine = require("./combine");

if (process.argv.length !== 5) {
  if (process.argv.length <= 2) {
    console.log(
      "node index.js <standard_notes_backup.json> <google_keep_takeout_dir> <output.json>"
    );
    return;
  }

  throw new Error(`expected 3 arguments, got ${process.argv.length - 2}`);
}

const snBackupPath = path.resolve(__dirname, process.argv[2]);
const takeoutDir = path.resolve(__dirname, process.argv[3]);
const outPath = path.resolve(__dirname, process.argv[4]);

console.log(`converting...`);
const convertedBackup = convert(takeoutDir);

console.log(`combining...`);
const combinedBackup = combine(
  convertedBackup,
  JSON.parse(fs.readFileSync(snBackupPath))
);

fs.writeFileSync(outPath, JSON.stringify(combinedBackup));
