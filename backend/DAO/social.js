const executeQuery = require('../database/postgresql');

class DAOSocial {

    async getFollowings(idUser) {
        try {
            const sql = 'Select u.id from users u join social s on s.id_following = $1 and s.id_follower = u.id;';
            return await executeQuery(sql, [idUser]);
        } catch (error) {
            throw error;
        }
    }

    async getFollowingsUsers(id) {
        try {
            const sql = 'Select u.id, u.username from users u join social s on s.id_following = $1 and s.id_follower = u.id;';
            return await executeQuery(sql, [id]);
        } catch (error) {
            throw error;
        }
    }

    async getFollowersUsers(id) {
        try {
            const sql = 'Select u.id, u.username from users u join social s on s.id_follower = $1 and s.id_following = u.id;';
            return await executeQuery(sql, [id]);
        } catch (error) {
            throw error;
        }
    }

    async unfollowUser(idFollowing, idFollower) {
        try {
            const sql = 'Delete from social where id_following = $1 and id_follower = $2;';
            return await executeQuery(sql, [idFollowing, idFollower]);
        } catch (error) {
            throw error;
        } 
    }

    async followUser(idFollowing, idFollower) {
        try {
            const sql = 'Insert into social (id_following, id_follower) values ($1, $2);';
            return await executeQuery(sql, [idFollowing, idFollower]);
        } catch (error) {
            throw error;
        } 
    }
}

module.exports = DAOSocial;