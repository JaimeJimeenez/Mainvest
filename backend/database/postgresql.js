'use strict'

const { query } = require('../database/connection/connection');

async function executeQuery(sql, params) {
    try {
        const data = await query(sql, params);
        return {
            success: true,
            data
        }
    } catch (error) {
        return {
            status: 500,
            success: false,
            error
        };
    }
}

module.exports = executeQuery;