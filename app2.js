//app.js
const express = require('express');
const app = express();
const port = 25000;
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/views'));

//app.get('/', (req, res) => {
//res.render('index.html')
//});
app.listen(port , () => console.log('Node.js app listening'));
