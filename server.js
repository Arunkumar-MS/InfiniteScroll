const express = require('express');
const compression = require('compression');
const path = require('path');
const app = new express();

const { getAnimalsImages } = require('./serverSide/routing');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static('public'));


app.get('/', (req, res) => {
    console.log(__dirname + '/index.html');
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/animals', compression(), getAnimalsImages);

app.listen(process.env.PORT || 3000, () => {
    console.log("Application started at 3000 port")
})