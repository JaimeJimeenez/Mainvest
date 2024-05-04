'use strict'

const DAONotification = require('../../DAO/notification');

const daoNotification = new DAONotification();

const newNotification = async (request, response) => {
    try {
        const { notification } = request.body;
        const { idUser, idPost, isLiked } = notification;
        const result = await daoNotification.newNotification(idUser, idPost, isLiked)
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener las notificaciones de los me gusta: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { newNotification };