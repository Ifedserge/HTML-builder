const { error } = require('console');
const fs = require('fs');
const path = require('path') ;

const text = path.join(__dirname, 'text.txt');
const read = fs.createReadStream(text, 'utf8');

read.on('data', chunk => {
    console.log(chunk);
});

read.on('error', err => {
    console.error('Error', err);
})