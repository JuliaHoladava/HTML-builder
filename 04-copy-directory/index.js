const fs = require('fs');
const path = require('path');

const recursive = true;

fs.mkdir(
  path.join(__dirname, 'files-copy'),
  { recursive },
  (err) => {
    if (err) throw err;
  });

async function copyDir() {
  const files = await fs.promises.readdir('./04-copy-directory/files');
  files.forEach(file => {
    const filePath = path.join(__dirname, 'files', file);
    const destPath = path.join(__dirname, 'files-copy', file);
    fs.copyFile(filePath, destPath, (err) => {
      if (err) throw err;
    });
  })
};

copyDir();
