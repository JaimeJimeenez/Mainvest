'use strict'

const DAOUser = require('../../DAO/user');

const daoUser = new DAOUser();

const checkUserExists = async (request, response, next) => {
    try {
        const { newUser } = request.body;
        const { username, email } = newUser;
        const user = await daoUser.getUser(username, email);

        if (user.data.length) {
            return response.status(409).json({ message: 'El email o usuario ya existe.'})
        }
        next();
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Se ha producido un error inesperado.' });
    }
}

module.exports = { checkUserExists };