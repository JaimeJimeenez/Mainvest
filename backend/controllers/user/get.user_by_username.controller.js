'use strict'

const DAOUser = require('../../DAO/user');

const daoUser = new DAOUser();

const getUserByUsername = async (request, response) => {
    try {
        const { username } = request.params;

        const result = await daoUser.getUserByUsername(username);
        if (result.data.length) {
            response.status(200).json(result);
        } else {
            response.status(404).json({ message: 'No existe el usuario' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getUserByUsername };