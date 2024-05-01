'use strict'

const DAOBoard = require('../../DAO/board');

const daoBoard = new DAOBoard();

const newReply = async (request, response) => {
    try {
        const { reply } = request.body;
        const { idPost, idUser, content } = reply;
        const result = await daoBoard.newReply(idPost, idUser, content);
        await daoBoard.updatePost(idPost);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al añadir una nueva respuesta: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { newReply };