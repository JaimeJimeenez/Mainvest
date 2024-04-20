'use strict'

const DAOUser = require('../../DAO/user');

const daoUser = new DAOUser();

const validateLogIn = async (request, response, next) => {
    try {
        const { user } = request.params;
        const { username } = JSON.parse(user);
        const userExists = await daoUser.getUserByUsername(username);

        if (!userExists.data.length) {
            return response.status(404).json({ message: 'Nombre de usuario o contraseña incorrectos '});
        }
        next();
    } catch (error) {
        return response.status(500).json({ message: 'Se ha producido un error inesperado.' });
    }
}

module.exports = { validateLogIn };