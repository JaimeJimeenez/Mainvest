const executeQuery  = require('../database/postgresql');

class DAOUser {

    async updateUsername(newUsername, oldUsername) {
        try {
            const sql = 'Update users set username = $1 where username = $2';
            return await executeQuery(sql, [ newUsername, oldUsername ]);
        } catch (error) {
            console.error(error.message);
        }
    }
    
    async updatePassword(username, password) {
        try {
            const sql = 'Update users set password = $1 where username = $2';
            return await executeQuery(sql, [ password, username ]);
        } catch (error) {
            console.error(error.message);
        }
    }

    async eraseUser(username) {
        try {
            const sql = 'Update users set isActive = false where username = $1';
            return await executeQuery(sql, [ username ]);
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = DAOUser;