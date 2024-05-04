'use strict'

const DAONotification = require('../../DAO/notification');

const daoNotification = new DAONotification();

const getLikedPosts = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoNotification.getLikedPosts(id)
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener las notificaciones de los me gusta: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getLikedPosts };