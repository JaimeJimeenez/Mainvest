'use strict'

const DAOBoard = require('../../DAO/board');

const daoBoard = new DAOBoard();

const addLike = async (request, response) => {
    try {
        const { like } = request.body;
        const { idPost, idUser } = like;

        const result = await daoBoard.addLikeUser(idPost, idUser);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al añadir un me gusta en la tabla users_likes: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { addLike };