const fs = require("fs").promises;
const path = require("path");

// Intended to mimick saving input files
// from actual production code.
//
// Images are sourced from input data, and saved to the same folder
// as gatsby-source-filesystem configs
const saveFiles = async (filesList) => {
  const directoryPath = ["src", "images"];
  await fs.mkdir(path.join(...directoryPath), { recursive: true });
  return Promise.all(
    filesList.map((file) =>
      fs.writeFile(path.join(...directoryPath, file.name), file.buffer)
    )
  );
};

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const directory = "data";
  const filePaths = [];
  for (let idx = 0; idx < 4; idx++) {
    filePaths.push(`${__dirname}/${directory}/icon${idx}.png`);
  }
  const buffers = [];
  await Promise.all(
    filePaths.map(async (filePath, idx) => {
      const buffer = await fs.readFile(filePath);
      buffers.push({
        name: `icon${idx}.png`,
        buffer: buffer,
      });
    })
  );

  saveFiles(buffers);
};
