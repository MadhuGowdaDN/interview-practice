const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'src');

const icons = new Set();
const components = new Set();
const reactImports = new Set();
const reactDomImports = new Set();

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walk(dirPath);
    } else if (dirPath.endsWith('.js') || dirPath.endsWith('.jsx')) {
      let content = fs.readFileSync(dirPath, 'utf8');
      
      let iconMatch = content.matchAll(/import\s+\{([^}]+)\}\s+from\s+['"]@icon['"]/g);
      for (const match of iconMatch) {
         match[1].split(',').forEach(i => {
           let name = i.trim();
           if (name) icons.add(name.split(' ')[0]);
         });
      }
      
      let compMatch = content.matchAll(/import\s+\{([^}]+)\}\s+from\s+['"]@common['"]/g);
      for (const match of compMatch) {
         match[1].split(',').forEach(c => {
           let name = c.trim();
           if (name) components.add(name.split(' ')[0]);
         });
      }
      
      let reactMatch = content.matchAll(/import\s+([^;]+?)\s+from\s+['"]@react['"]/g);
      for (const match of reactMatch) {
         let importsStr = match[1];
         if (importsStr.includes('{')) {
             let inside = importsStr.match(/\{([^}]+)\}/);
             if (inside) {
                 inside[1].split(',').forEach(r => {
                     let name = r.trim();
                     if (name) reactImports.add(name.split(' ')[0]);
                 });
             }
         }
      }
    }
  });
}
walk(srcDir);
console.log('ICONS:', Array.from(icons).sort().join(', '));
console.log('COMPONENTS:', Array.from(components).sort().join(', '));
console.log('REACT IMPORTS:', Array.from(reactImports).sort().join(', '));
