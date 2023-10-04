const { Client } = require('pg');

const CONFIG = require('./config/config');

const client = new Client(CONFIG);

client.connect();

client.query('Select * from users', (error, result) => {
    if (!error)
        console.log(result.rows);
    else console.log(error.message);
    client.end;
});



/*
'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const CONFIG = require('./config/config');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : true }));

app.listen(CONFIG.port, () => {
    console.log('Server listening at port: ' + CONFIG.mysqlConfig.port);
});*/