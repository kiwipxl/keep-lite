const path = require("path");
const fs = require("fs");
const gm = require("gm");

module.exports = minifyTakeout;

async function minifyTakeout(takeoutDir, outDir) {
  let totalJsonSize = 0;
  let numJsonFiles = 0;

  const files = fs.readdirSync(takeoutDir);
  for (const name of files) {
    const filePath = path.join(takeoutDir, name);
    const outFilePath = path.join(outDir, name);
    const fileSize = fs.statSync(filePath).size;
    const fileExtension = name
      .substring(name.lastIndexOf(".") + 1)
      .toLowerCase();

    if (fileExtension === "json") {
      fs.copyFileSync(filePath, outFilePath);

      totalJsonSize += fileSize;
      ++numJsonFiles;
    }

    if (
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg"
    ) {
      await new Promise((resolve, reject) => {
        gm(filePath)
          .resize(700, 700, "@")
          .write(outFilePath, (err) => {
            if (err) {
              reject(err);
              return;
            }

            console.log(`resized ${outFilePath}`);

            resolve();
          });
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  console.log(
    `copied ${numJsonFiles} json files (${totalJsonSize / 1000.0 / 1000.0}mb)`
  );
}
