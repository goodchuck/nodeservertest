//app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(30003, () => console.log('Node.js app listening'));
