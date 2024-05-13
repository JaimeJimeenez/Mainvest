'use strict'

const DAOAlert = require('../../DAO/alert');

const daoAlert = new DAOAlert();

const addAlert = async (request, response) => {
    try {
        const { alert } = request.body;
        const { idUser, name, price } = alert;
        const result = await daoAlert.addAlert(idUser, name, price);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al añadir la alerta del usuario: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { addAlert };