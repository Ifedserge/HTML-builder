const fs = require('fs');
const path = require('path');
const readline = require('readline');

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const file = path.join(__dirname, 'text.txt');

const writeFile = () => {
    read.question('Введите сообщение ', (input) => {
        if (input.toLowerCase() === `exit`) {
            console.log("завершение");
            read.close();
        } else {
            fs.appendFile(file, input + '\n', (err) => {
                if (err) {
                    console.err('Error', err);
                    read.close();
                } else {
                    console.log('Добавлено');
                    writeFile();
                }
            });
        }
    });
}

const end = () => {
    console.log('Заверешние');
    read.close()
}
read.on('SIGINT', () => {
    end()
})
writeFile();