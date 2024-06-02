'use strict'

const DAOBoard = require('../../DAO/board');

const daoBoard = new DAOBoard();

const getUsersPosts = async (request, response) => {
    try {
        const { id } = request.params;
        console.log(id);
        const result = await daoBoard.getUsersPosts(id);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener los posts con me gusta del usuario: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getUsersPosts };