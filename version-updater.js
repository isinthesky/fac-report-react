const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, 'package.json');
const packageJson = require(packagePath);

function incrementVersion(version) {
  const parts = version.split('.');
  parts[parts.length - 1] = (parseInt(parts[parts.length - 1], 10) + 1).toString();
  return parts.join('.');
}

packageJson.version = incrementVersion(packageJson.version);

fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2), (err) => {
  if (err) throw err;
  console.log(`Updated version to ${packageJson.version}`);
});
