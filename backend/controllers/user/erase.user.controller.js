'use strict'

const DAOUser = require('../../DAO/user');

const daoUser = new DAOUser();

const eraseUser = async (request, response) => {
    try {
        console.log('Elimiando el usuario...');
        const { id } = request.params;
        console.log(`Datos del usuario a eliminar..., ${ id }`);

        const erased = await daoUser.eraseUser(id);
        const result = {
            success: true,
            data: true
        }
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { eraseUser };