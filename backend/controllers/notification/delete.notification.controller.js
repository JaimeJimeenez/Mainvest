'use strict'

const DAONotification = require('../../DAO/notification');

const daoNotification = new DAONotification();

const deleteNotification = async (request, response) => {
    try {
        const { idUser, idPost, isLiked } = request.params;
        const result = await daoNotification.deleteNotification(idUser, idPost, isLiked)
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al eliminar las notificaciones de los me gusta: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { deleteNotification };