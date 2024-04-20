const executeQuery = require('../database/postgresql');

class DAOUser {

    async getUserByUsernameOrEmail(username, email) {
        try {
            const sql = 'Select * from users where username = $1 or email = $2;';
            return await executeQuery(sql, [username, email]);
        } catch (error) {
            throw error;
        }
    }

    async getUserByUsername(username) {
        try {
            const sql = 'Select * from users where username = $1;';
            return await executeQuery(sql, [username]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOUser;