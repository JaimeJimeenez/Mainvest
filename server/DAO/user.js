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

    async addMoney(id, money) {
        try {
            const sql = 'Update users set money = money + $1 where id = $2 returning money + $1 as new_money;';
            return await executeQuery(sql, [money, id]);
        } catch (error) {
            console.error(error.message);
        }
    }

    async getMoney(id) {
        try {
            const sql = 'Select money from users where id = $1';
            return await executeQuery(sql, [id]);
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = DAOUser;