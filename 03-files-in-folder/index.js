const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, { withFileTypes: true}, (err, files) => {
    if(err) {
        console.log(err);
        return;
    }
    files.forEach(file => {
        if(file.isFile()){
            let filePath = path.join(folder, file.name);
            let fileExt = path.extname(file.name).slice(1);
            let fileName = path.basename(file.name, `.${fileExt}`);

            fs.stat(filePath, (err, stats) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log(`${fileName} - ${fileExt} - ${stats.size}b`);
            })
        }
    })
})
