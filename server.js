
var express = require('express');
var app = express();
var path= require('path');
const port = 3000;

app.use(express.static(path.join(__dirname,'./public/')));

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html');
});

app.listen(port, function () {
    console.log('listening on *:' + port);
});