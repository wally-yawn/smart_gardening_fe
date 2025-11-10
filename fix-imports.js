// fix-imports.js
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
    } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.jsx'))) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let updated = content;

      // Match import statements
      updated = updated.replace(
        /import\s+([^\n]+?)\s+from\s+['"](.+?)['"]/g,
        (match, imports, importPath) => {
          // Only update relative imports
          if (importPath.startsWith('.') && !importPath.endsWith('.css') && !importPath.endsWith('.json')) {
            const resolvedPathJs = path.resolve(path.dirname(fullPath), importPath + '.js');
            if (fs.existsSync(resolvedPathJs)) {
              return `import ${imports} from '${importPath}.jsx'`;
            }
          }
          return match;
        }
      );

      if (updated !== content) {
        fs.writeFileSync(fullPath, updated, 'utf-8');
        console.log(`Updated imports in: ${fullPath}`);
      }
    }
  });
}

scanFolder(SRC_DIR);
console.log('Done fixing imports to include .jsx.');
