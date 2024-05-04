const executeQuery = require('../database/postgresql');

class DAONotification {

    async newNotification(idUser, idPost, isLiked) {
        try {
            const sql = 'Insert into notifications (id_user, id_post, is_liked) values ($1, $2, $3);';
            return await executeQuery(sql, [idUser, idPost, isLiked]);
        } catch (error) {
            throw error;
        }
    }

    async getLikedPosts(idUser) {
        try {
            const sql = 'Select p.id, p.content, p.likes, p .replies, p.created_at, p.id_user, u.username from posts p join notifications n on n.id_post = p.id and n.is_liked = true join users u on u.id = n.id_user where p.id_user = $1;';
            return await executeQuery(sql, [idUser]);
        } catch (error) {
            throw error;
        }
    };

    async deleteNotification(idUser, idPost, isLiked) {
        try {
            const sql = 'Delete from notifications where id_user = $1 and id_post = $2 and is_liked = $3;';
            return await executeQuery(sql, [idUser, idPost, isLiked]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAONotification;