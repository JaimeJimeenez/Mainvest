const executeQuery  = require('../database/postgresql');

class DAOAuth {

    async login(username) {
        try {
            const sql = 'Select * from users where username = $1';
            return await executeQuery(sql, [ username ]);
        } catch (error) {
            console.error(error.message);
        }
    }

    async getUser(username, email) {
        try {
            const sql = 'Select * from users where username = $1 or email = $2';
            return await executeQuery(sql, [ username, email ]);
        } catch (error) {
            console.error(error.message);
        }
    }

    async signUp(username, name, password, email) {
        try {
            const sql = 'Insert into users (username, name, password, email, isAdmin, isActive) values ($1, $2, $3, $4, false, true)';
            return await executeQuery(sql, [ username, name, password, email ]);
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = DAOAuth;