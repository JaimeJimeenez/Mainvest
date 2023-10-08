const { query } = require('../database/connection/connection');

async function executeQuery(sql, params) {
    try {
        const data = await query(sql, params);
        return {
            status : 200,
            success : 'true',
            message : 'query is successfully',
            data 
        }
    } catch(error) {
        return {
            status : 500,
            success : 'false',
            error,
            req_query : sql,
        }
    }
}

module.exports = executeQuery;