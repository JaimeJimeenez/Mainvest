'use strict'

const DAONotification = require('../../DAO/notification');

const daoNotification = new DAONotification();

const getRepliesPosts = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoNotification.getRepliesPosts(id)
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener las notificaciones de los comentarios: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getRepliesPosts };