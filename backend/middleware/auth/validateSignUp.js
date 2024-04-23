'use strict'

const DAOUser = require('../../DAO/user');

const daoUser = new DAOUser();

const validateSignUp = async (request, response, next) => {
    try {
        const { user } = request.body;
        const { username, email } = user;
        const newUser = await daoUser.getUserByUsernameOrEmail(username, email);

        if (newUser.data.length) {
            return response.status(409).json({ message: 'El email o usuario ya existe.'})
        }
        next();
    } catch (error) {
        return response.status(500).json({ message: 'Se ha producido un error inesperado.' });
    }
}

module.exports = { validateSignUp };