const executeQuery = require('../database/postgresql');

class DAOAlert {

    async getAlerts(id) {
        try {
            const sql = 'Select a.id, p.message, a.readed, a.liked, u.username, u.id as id_transmitter from alerts a join alerts_user au ON au.id_receiver = $1 and a.id = au.id_alert join users u on au.id_transmitter = u.id join post p on p.id = a.id_post;';
            return await executeQuery(sql, [id]);
        } catch (error) {
            console.error(error.message)
        }
    }

    async getUsersByAlerts(ids) {
        try {
            const placeholders = '';
            ids.forEach((id, index) => {
                placeholders += `u.id = $${index + 1} or `
            });
            placeholders = placeholders.slice(0, placeholders.length() - 3)
            const sql = `Select u.name from users where ${placeholders}`;
            console.log(placeholders);
            return await executeQuery(sql, [id])
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = DAOAlert;