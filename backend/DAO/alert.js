const executeQuery = require('../database/postgresql');

class DAOAlert {

    async addAlert(user, asset, price) {
        try {
            const sql = 'Insert into alerts (id_user, asset, price) values ($1, $2, $3);';
            return await executeQuery(sql, [user, asset, price]);
        } catch (error) {
            throw error;
        }
    }

    async getAlert(user, asset, price) {
        try {
            const sql = 'Select * from alerts where id_user = $1 and asset = $2 and price = $3;';
            return await executeQuery(sql, [user, asset, price]);
        } catch (error) {
            throw error;
        }
    }

    async getUserAlerts(idUser) {
        try {
            const sql = 'Select * from alerts where id_user = $1;';
            return await executeQuery(sql, [idUser]);
        } catch (error) {
            throw error;
        }
    }

    async deleteAlert(id) {
        try {
            const sql = 'Delete from alerts where id = $1;';
            return await executeQuery(sql, [id]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOAlert;