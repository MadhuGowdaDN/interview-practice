const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walk(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

walk(srcDir, (filePath) => {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
  // Ignore the newly created files and index files inside common
  if (filePath.includes(path.normalize('src/components/common/mui'))) return;
  if (filePath.includes(path.normalize('src/components/common/react'))) return;
  if (filePath.includes(path.normalize('src/components/common/dom'))) return;
  
  if (filePath === path.join(srcDir, 'components', 'common', 'index.js')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // MUI Material
  content = content.replace(/from\s+['"]@mui\/material['"]/g, 'from "@common"');
  content = content.replace(/from\s+['"]@mui\/material\/.*?['"]/g, 'from "@common"');
  
  // MUI Icons
  content = content.replace(/from\s+['"]@mui\/icons-material['"]/g, 'from "@icon"');
  content = content.replace(/from\s+['"]@mui\/icons-material\/.*?['"]/g, 'from "@icon"');

  // React and DOM
  content = content.replace(/from\s+['"]react['"]/g, 'from "@react"');
  content = content.replace(/from\s+['"]react-dom['"]/g, 'from "@react"');
  content = content.replace(/from\s+['"]react-dom\/client['"]/g, 'from "@react"');
  content = content.replace(/from\s+['"]react-router-dom['"]/g, 'from "@react"');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated: " + filePath);
  }
});

console.log("Refactoring complete.");
