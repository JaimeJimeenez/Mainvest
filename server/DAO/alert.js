const executeQuery = require('../database/postgresql');

class DAOAlert {

    async getAlerts(id) {
        try {
            const sql = 'Select a.id, p.message, a.readed, a.liked, u.username, u.id as id_transmitter from alerts a join alerts_user au ON au.id_receiver = $1 and a.id = au.id_alert join users u on au.id_transmitter = u.id join post p on p.id = a.id_post where a.readed = false;';
            return await executeQuery(sql, [id]);
        } catch (error) {
            console.error(error.message)
        }
    }

    async deleteAlert(id) {
        try {
            const sql = 'Update alerts set readed = true where id = $1;';
            return await executeQuery(sql, [id]);
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = DAOAlert;