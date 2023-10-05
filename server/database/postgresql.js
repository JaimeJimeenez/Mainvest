const Client = require('pg');
const CONFIG = require('../config/config');

const client = new Client(CONFIG.mysqlConfig);

await client.connect();

const result = await client.query('Select * from users');
console.log(result);

await client.end();