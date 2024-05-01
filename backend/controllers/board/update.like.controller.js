'use strict'

const DAOBoard = require('../../DAO/board');

const daoBoard = new DAOBoard();

const updateLike = async (request, response) => {
    try {
        const { like } = request.body;
        const { idPost, updateLike } = like;
        const result = await daoBoard.updateLikePost(idPost, updateLike);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al actualizar los me gusta del post: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { updateLike };