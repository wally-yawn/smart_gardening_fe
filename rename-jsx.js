// rename-jsx.js
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

// Recursively scan a folder
function scanFolder(folder) {
  const files = fs.readdirSync(folder);

  files.forEach((file) => {
    const fullPath = path.join(folder, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanFolder(fullPath);
    } else if (stat.isFile() && path.extname(file) === '.js') {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (/<[A-Za-z]/.test(content)) { // crude check for JSX
        const newFile = fullPath.replace(/\.js$/, '.jsx');
        fs.renameSync(fullPath, newFile);
        console.log(`Renamed: ${fullPath} → ${newFile}`);
      }
    }
  });
}

scanFolder(SRC_DIR);
console.log('Done renaming JS files containing JSX to JSX extension.');
