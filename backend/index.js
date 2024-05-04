require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 52300;

app.use(bodyParser.json())
app.use(cors());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/board', require('./routes/board'));
app.use('/social', require('./routes/social'));
app.use('/wallet', require('./routes/wallet'));
app.use('/notification', require('./routes/notification'));

app.listen(port, () => {
    console.log(`Server listening at port ${ port }`);
});