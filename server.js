const express = require('express');
const fs = require('fs');
const {articles} = require('./data');
const {getArticleIndexById, idExists, getWholeFile} = require('./utils.js');

const app = express();
app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

app.get('/articles', (req, res, next) => {
    let article = articles;
    if (articles){
        //getWholeFile('./data.json');
        res.send({articles: article});
    } else {
        res.status(404).send();
    }
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    const ind = getArticleIndexById(id, articles);
    if (ind !== -1){
        res.send({article: articles[ind]});
    } else {
        res.status(404).send();
    }
});

app.post('/articles', (req, res, next) => {
    const id = req.query.id;
    const article = req.query.article;
    const author = req.query.author;
    if (!(idExists(id, articles)) && article && author){
        const newArticle = {id: Number(id), article: article, author: author};
        articles.push(newArticle);
        res.send({article: articles[articles.length-1]});
    } else {
        res.status(400).send()
    }
})

app.put('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    const article = req.query.article;
    const author = req.query.author;
    const ind = getArticleIndexById(id, articles);
    if (ind!==-1){
        articles[ind] = {id: id, article: article, author: author};
        res.send({article: articles[ind]});
    } else {
        res.status(404).send()
    }
})

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    const ind = getArticleIndexById(id, articles);
    if (ind!==-1){
        articles.splice(ind,1);
        res.status(202).send();
    } else {
        res.status(404).send();
    }
})

app.listen(PORT, console.log(`http://localhost:${PORT}`));