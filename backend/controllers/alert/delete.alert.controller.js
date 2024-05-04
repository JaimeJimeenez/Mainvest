'use strict'

const DAOAlert = require('../../DAO/alert');

const daoAlert = new DAOAlert();

const deleteAlert = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoAlert.deleteAlert(id)
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al eliminar la alerta del usuario: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { deleteAlert };