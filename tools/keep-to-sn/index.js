const fs = require("fs");
const path = require("path");
const process = require("process");
const convert = require("./convert");
const combine = require("./combine");
const { filterNotes } = require("./tools");
const minifyTakeout = require("./minify_takeout");

function cmdConvert(snBackupPath, takeoutDir, outPath) {
  snBackupPath = path.resolve(__dirname, snBackupPath);
  takeoutDir = path.resolve(__dirname, takeoutDir);
  outPath = path.resolve(__dirname, outPath);

  console.log(`converting...`);
  const convertedBackup = convert(takeoutDir);

  console.log(`combining...`);
  const combinedBackup = combine(
    convertedBackup,
    JSON.parse(fs.readFileSync(snBackupPath))
  );

  fs.writeFileSync(outPath, JSON.stringify(combinedBackup));
}

function cmdFilterNoTagNotes(backupPath, outPath, deleteFlag) {
  backupPath = path.resolve(__dirname, backupPath);
  outPath = path.resolve(__dirname, outPath);

  const backup = JSON.parse(fs.readFileSync(backupPath));
  const newBackup = filterNotes(backup, (note, notes, tags) => {
    const hasTag = Object.values(tags).find((tag) =>
      tag.content.references.find((ref) => ref.uuid === note.uuid)
    );

    if (deleteFlag && !hasTag) {
      note.deleted = true;
    }

    return !hasTag;
  });

  fs.writeFileSync(outPath, JSON.stringify(newBackup));
}

if (process.argv.length > 2) {
  const command = process.argv[2];
  switch (command) {
    case "convert":
      if (process.argv.length === 4) {
        cmdConvert(process.argv[3], process.argv[4], process.argv[5]);
      } else {
        throw new Error(`expected 4 arguments, got ${process.argv.length}`);
      }
      break;

    case "filter-no-tag-notes":
      if (process.argv.length === 6) {
        cmdFilterNoTagNotes(process.argv[3], process.argv[4], process.argv[5]);
      } else {
        throw new Error(`expected 6 arguments, got ${process.argv.length}`);
      }
      break;

    case "minify-takeout":
      if (process.argv.length === 5) {
        minifyTakeout(process.argv[3], process.argv[4]);
      } else {
        throw new Error(`expected 5 arguments, got ${process.argv.length}`);
      }
      break;

    default:
      throw new Error(`invalid command ${command}`);
  }
} else {
  console.log(
    "node index.js convert <standard_notes_backup.json> <google_keep_takeout_dir> <output.json>"
  );
  console.log(
    "node index.js filter-no-tag-notes <backup.json> <output.json> <delete_flag>"
  );
  console.log(
    "node index.js minify-takeout <google_keep_takeout_Dir> <output_dir>"
  );
  return;
}
