const fs = require('fs').promises;
const path = require('path');

const styleDir = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
    try {
        const files = await fs.readdir(styleDir, {withFileTypes: true});
        let content = '';

        for(const file of files) {
            if(file.isFile() && path.extname(file.name) === '.css') {
                const filePath = path.join(styleDir, file.name);
                const fileContent = await fs.readFile(filePath, 'utf-8');
                content += fileContent + '\n';
            }
        }
        await fs.writeFile(bundlePath, content);
    } catch (err) {
        console.log(err);
    }
}
mergeStyles();

