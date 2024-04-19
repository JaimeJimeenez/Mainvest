const executeQuery = require('../database/postgresql');

class DAOUser {

    async getUser(username, email) {
        try {
            const sql = 'Select * from users where username = $1 or email = $2;';
            return await executeQuery(sql, [username, email]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOUser;