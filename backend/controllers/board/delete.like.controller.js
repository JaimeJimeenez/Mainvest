'use strict'

const DAOBoard = require('../../DAO/board');

const daoBoard = new DAOBoard();

const deleteLike = async (request, response) => {
    try {
        const { idUser, idPost } = request.params;

        const result = await daoBoard.deleteLike(idPost, idUser);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al eliminar un me gusta en la tabla users_likes: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { deleteLike };