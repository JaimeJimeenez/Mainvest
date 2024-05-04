'use strict'

const DAOAlert = require('../../DAO/alert');

const daoAlert = new DAOAlert();

const getUserAlerts = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoAlert.getUserAlerts(id)
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener las alertas del usuario: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getUserAlerts };