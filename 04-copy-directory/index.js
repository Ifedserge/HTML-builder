const fs = require ('fs').promises;
const path = require('path');


async function copyDir(src, dest) {
    try {
        await fs.mkdir(dest, { recursive: true });
        const entries = await fs.readdir(src, { withFileTypes: true });

        for (let entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            entry.isDirectory() ? 
                await copyDir(srcPath, destPath) : 
                await fs.copyFile(srcPath, destPath);
        }
    } catch (err) {
        console.log('Error occurred:', err);
    }
}
const srcDirect = path.join(__dirname, 'files');
const destDirect = path.join(__dirname, 'files-copy');

copyDir(srcDirect, destDirect);
