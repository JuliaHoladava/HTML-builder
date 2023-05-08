const fs = require('fs');
const path = require('path');

const recursive = true;

fs.mkdir(
  path.join(__dirname, 'project-dist'),
  { recursive },
  err => {
  if (err) throw err;
});

//create index.html file
fs.writeFile(
  path.join(__dirname, 'project-dist', 'index.html'),
  '',
  (err) => {
    if (err) throw err;
  }
)

fs.readFile(
  path.join(__dirname, 'template.html'),
  'utf-8',
  (err, data) => {
    if (err) throw err;
    const templateCont = data;

    const regex = /{{(.+?)}}/g;
    let array;
    let i = 0;
    while ((array = regex.exec(templateCont)) !== null) {
      let word = array[i];
      i += 1;

      const replasedCont = templateCont.replace(/{{(.+?)}}/g, (word, componentName) => {
        const componentCont = fs.readFileSync(
          path.join(path.join(__dirname, 'components'), `${componentName}.html`),
          'utf-8',
          (err) => {
            if (err) throw err;
          });

          return componentCont;
      })

      fs.writeFileSync(
        path.join(__dirname, 'project-dist', 'index.html'),
        replasedCont,
        (err) => {
          if (err) throw err;
        });
    };
  }
)

//create style.css file
fs.writeFile(
  path.join(__dirname, 'project-dist', 'style.css'),
  '',
  (err) => {
    if (err) throw err;
  }
);

fs.readdir('./06-build-page/styles', function(err, files) {
  if (err) throw err;

  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      fs.readFile(
        path.join('./06-build-page/styles', file),
        'utf8',
        (err, data) => {
          if (err) throw err;

          fs.appendFile(
            path.join(__dirname, 'project-dist', 'style.css'),
            data,
            (err) => {
              if (err) throw err;
            })
        }
      )
    }
  })
});

//copy dir assets
const source = './06-build-page/assets';
const target = './06-build-page/project-dist/assets';

async function copyDir(source, target) {
  await fs.promises.mkdir(target, { recursive: true });

  const files = await fs.promises.readdir(source, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(source, file.name);
    const destPath = path.join(target, file.name);

    if (file.isDirectory()) {
      await copyDir(filePath, destPath);
    } else {
      await fs.copyFile(filePath, destPath, (err) => {
        if (err) throw err;
      });
    }
  }
};

async function main() {
  await copyDir(source, target);
}

main().catch((err) => {
  if (err) throw err;
});
