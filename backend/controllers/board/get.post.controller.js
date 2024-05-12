'use strict'

const DAOBoard = require('../../DAO/board');

const daoBoard = new DAOBoard();

const getPost = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoBoard.getPost(id);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener el post: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getPost };