'use strict'

const DAOBoard = require('../../DAO/board');

const daoBoard = new DAOBoard();

const getRandomPosts = async (request, response) => {
    try {
        const result = await daoBoard.getRandomPosts();
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener posts random: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getRandomPosts };