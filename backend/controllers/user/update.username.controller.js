'use strict'

const DAOUser = require('../../DAO/user');

const daoUser = new DAOUser();

const updateUsername = async (request, response) => {
    try {
        console.log('Actualizando el nombre de usuario...');
        const { user } = request.body;
        const { id, username } = user;
        console.log(`Datos actualizados del usuario..., ${ id }, ${ username }`);

        const update = await daoUser.updateUsername(+id, username);
        const result = {
            success: true,
            data: true
        }
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { updateUsername };