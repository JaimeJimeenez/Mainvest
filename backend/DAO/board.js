const executeQuery = require('../database/postgresql');

class DAOBoard {

    async getRandomPosts() {
        try {
            const sql = 'Select p.id, p.content, p.likes, p .replies, p.created_at, p.id_user, u.username from posts p join users u on u.id = p.id_user order by created_at desc, random()';
            return await executeQuery(sql);
        } catch(error) {
            console.error(error.message);
        }
    }

    async newPost(idUser, content) {
        try {
            const sql = 'Insert into posts (id_user, content) values ($1, $2);';
            return await executeQuery(sql, [idUser, content]);
        } catch (error) {
            throw error;
        }
    }

    async newReply(idPost, idUser, content) {
        try {
            const sql = 'Insert into replies (id_post, id_user, content) values ($1, $2, $3);';
            return await executeQuery(sql, [idPost, idUser, content]);
        } catch (error) {
            throw error;
        }
    }

    async updatePost(idPost) {
        try {
            const sql = 'Update posts set replies = replies + 1 where id = $1;';
            return await executeQuery(sql, [idPost]);
        } catch (error) {
            throw error;
        }
    }

    async updateLikePost(idPost, updateLike) {
        try {
            const sql = 'Update posts set likes = likes + $1 where id = $2;';
            return await executeQuery(sql, [updateLike, idPost]);
        } catch (error) {
            throw error;
        }
    }

    async addLikeUser(idPost, idUser) {
        try {
            const sql = 'Insert into users_likes (id_post, id_user) values ($1, $2);';
            return await executeQuery(sql, [idPost, idUser]);
        } catch (error) {
            throw error;
        }
    }

    async getLikedPosts(idUser) {
        try {
            const sql = 'Select p.id from posts p join users_likes ul on ul.id_post = p.id and ul.id_user = $1;'
            return await executeQuery(sql, [idUser]);
        } catch (error) {
            throw error;
        }
    }

    async deleteLike(idPost, idUser) {
        try {
            const sql = 'Delete from users_likes where id_user = $1 and id_post = $2;';
            return await executeQuery(sql, [idUser, idPost]);
        } catch (error) {
            throw error;
        }
    }

    async getFollowingPosts(ids) {
        try {
            const placeholders = ids.map((_, index) => `p.id_user = $${index + 1 } or`).join(' ');
            const sql = `Select p.id, p.content, p.likes, p .replies, p.created_at, p.id_user, u.username from posts p join users u on u.id = p.id_user where ${placeholders.slice(0, placeholders.length - 3)} order by created_at desc`;
            return await executeQuery(sql, ids);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOBoard;