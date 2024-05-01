'use strict'

const DAOBoard = require('../../DAO/board');

const daoBoard = new DAOBoard();

const getFollowingsPosts = async (request, response) => {
    try {
        const { ids } = request.params;
        const result = await daoBoard.getFollowingPosts(ids.split(','));
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener los posts de los usuarios: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getFollowingsPosts };