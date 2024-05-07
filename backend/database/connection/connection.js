'use strict'

require('dotenv').config();
const { Pool } = require('pg');

const config = {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT,
}

async function query(sql, params) {
    const pool = new Pool(config);
    try {
        const result = await pool.query(sql, params);
        return result.rows;
    } catch (error) {
        console.error(`Query error: ${ error.message }`);
        throw error;
    } finally {
        await pool.end();
    }
}

module.exports = { query };