'use strict'

const DAOBoard = require('../../DAO/board');

const daoBoard = new DAOBoard();

const getLikedPosts = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoBoard.getLikedPosts(id);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener los posts con me gusta del usuario: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getLikedPosts };