const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdout } = process;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.writeFile(
  path.join(__dirname, 'notes.txt'),
  '',
  (err) => {
    if (err) throw err;
  }
);

stdout.write('Hi, new user!\n');

function appendFile(data) {
  if (data.toLowerCase().trim() === 'exit') {
    stdout.write('Good luck!');
    rl.close();
    process.exit();
  } else {
    rl.question('Type something here: ', appendFile);
  }

  fs.appendFile(
    path.join(__dirname, 'notes.txt'),
    data,
    err => {
      if (err) throw err;
      rl.question('Type something here: ', appendFile);
  })
};

rl.question('Type something here: ', appendFile);

rl.on('SIGINT', () => {
  stdout.write('Good luck!');
  process.exit();
});
