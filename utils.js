const fs = require('fs');

const getWholeFile = (p) => {
    fs.readFile(p, 'utf-8', (err, data) => {
        if (err){
            console.log(er);
        } else {
            const text = JSON.parse(data);
            return text;
        }
    });
}

const idExists = (id, arr) => {
    const exists = arr.some(r => r.id === Number(id));
    return exists;
}

const getArticleIndexById = (id, arr) => {
    const ind = arr.findIndex(r => r.id === Number(id));
    return ind;
}

module.exports = {getArticleIndexById, idExists, getWholeFile};