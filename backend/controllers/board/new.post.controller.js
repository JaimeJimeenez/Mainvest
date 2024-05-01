'use strict'

const DAOBoard = require('../../DAO/board');

const daoBoard = new DAOBoard();

const newPost = async (request, response) => {
    try {
        const { newPost } = request.body;
        const { idUser, content } = newPost;

        const result = await daoBoard.newPost(idUser, content);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al añadir un nuevo post: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { newPost };