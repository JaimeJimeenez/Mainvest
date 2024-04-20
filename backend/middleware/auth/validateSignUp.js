'use strict'

const DAOUser = require('../../DAO/user');

const daoUser = new DAOUser();

const validateSignUp = async (request, response, next) => {
    try {
        const { newUser } = request.body;
        const { username, email } = newUser;
        const user = await daoUser.getUserByUsernameOrEmail(username, email);

        if (user.data.length) {
            return response.status(409).json({ message: 'El email o usuario ya existe.'})
        }
        next();
    } catch (error) {
        return response.status(500).json({ message: 'Se ha producido un error inesperado.' });
    }
}

module.exports = { validateSignUp };