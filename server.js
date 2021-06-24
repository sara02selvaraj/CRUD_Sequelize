const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const mysql = require('mysql');
const http = require('http');
const ejs = require('ejs');
const path = require('path');
const db = require('./models');
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = process.env.PORT || 4000;

app.use(cors());

//set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./router/apiRouter'))

db.sequelize.sync().then((req) => {
    app.listen(4000, () => {
        console.log(`server running at http://${hostname}:${port}`)
    })
})