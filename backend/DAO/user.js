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

    async getUsername(id) {
        try {
            const sql = 'Select username from users where id = $1;';
            return await executeQuery(sql, [id]);
        } catch (error) {
            throw error;
        }
    }

    async updatePassword(id, password) {
        try {
            const sql = 'Update users set password = $1 where id = $2';
            return await executeQuery(sql, [password, id]);
        } catch (error) {
            throw error;
        }
    }

    async updateUsername(id, username) {
        try {
            const sql = 'Update users set username = $1 where id = $2;';
            return await executeQuery(sql, [username, id]);
        } catch (error) {
            throw error;
        }
    }

    async eraseUser(id) {
        try {
            const sql = 'Delete from users where id = $1;';
            return await executeQuery(sql, [id]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOUser;