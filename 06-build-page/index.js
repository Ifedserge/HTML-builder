const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
    const projectDist = path.join(__dirname, 'project-dist');
    await fs.mkdir(projectDist, {recursive: true});

    await copyDir(path.join(__dirname, 'assets'), path.join(projectDist, 'assets'));
    await compCss(path.join(__dirname, 'styles'), path.join(projectDist, 'style.css'));
    await compHtml(path.join(__dirname, 'template.html'), path.join(__dirname, 'components'), path.join(projectDist, 'index.html'));

    async function copyDir(src, dest) {
        await fs.mkdir(dest, {recursive: true});
        const entries = await fs.readdir(src, {withFileTypes: true});

        for(let entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            entry.isDirectory() ? await copyDir(srcPath, destPath) : await fs.copyFile(srcPath, destPath);
        }
    }

    async function compCss(srcDir, destFile){
        const files = await fs.readdir(srcDir, {withFileTypes: true}); 
        let content = '';
        for(let file of files){
            if(file.isFile() && path.extname(file.name) === '.css') {
                const data = await fs.readFile(path.join(srcDir, file.name), 'utf-8');
                content += data + '\n';
            }
        }
        await fs.writeFile(destFile, content);
    }

    async function compHtml(templatePath, componentsDir, destPath){
        let tempalte = await fs.readFile(templatePath, 'utf-8');
        const components =  await fs.readdir(componentsDir, {withFileTypes: true});

        for(let component of components){
            if(component.isFile() && path.extname(component.name) === '.html'){
                const name = path.basename(component.name, '.html');
                const data = await fs.readFile(path.join(componentsDir, component.name), 'utf-8');
                tempalte = tempalte.replace(`{{${name}}}`, data);
            }
        }
        await fs.writeFile(destPath, tempalte);
    }
    
}
buildPage();