const fs = require('fs');
const path = require('path');

fs.readdir('./03-files-in-folder/secret-folder', { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    const filePath = path.join(__dirname, 'secret-folder', file.name);
    fs.stat(filePath,
    (err, stats) => {
      if (err) throw err;

      if (stats.isFile()) {
        console.log(`${path.parse(filePath).name} - ${path.extname(filePath)} - ${stats.size/1000}kb`);
      }
    }
    )
  })
})
