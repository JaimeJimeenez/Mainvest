const executeQuery = require('../database/postgresql');

class DAOSocial {

    async getFollowings(idUser) {
        try {
            const sql = 'Select id_following as id from social where id_follower = $1;';
            return await executeQuery(sql, [idUser]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOSocial;