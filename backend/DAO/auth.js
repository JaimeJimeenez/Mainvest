const executeQuery = require('../database/postgresql');

class DAOAuth {

    async signUp(username, name, password, email) {
        try {
            const sql = 'Insert into users (username, name, password, email) values ($1, $2, $3, $4) returning id;'
            return await executeQuery(sql, [username, name, password, email]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOAuth;