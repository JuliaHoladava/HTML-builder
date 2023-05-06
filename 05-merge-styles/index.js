const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  '',
  (err) => {
    if (err) throw err;
  }
);

fs.readdir('./05-merge-styles/styles', function(err, files) {
  if (err) throw err;

  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      fs.readFile(
        path.join('./05-merge-styles/styles', file),
        'utf8',
        (err, data) => {
          if (err) throw err;

          fs.appendFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
            data,
            (err) => {
              if (err) throw err;
            })
        }
      )
    }
  })
});
