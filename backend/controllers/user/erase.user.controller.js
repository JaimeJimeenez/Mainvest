'use strict'

const DAOUser = require('../../DAO/user');

const daoUser = new DAOUser();

const eraseUser = async (request, response) => {
    try {
        const { id } = request.params;
        const erased = await daoUser.eraseUser(id);
        const result = {
            success: true,
            data: true
        }
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al intentar eliminar el usuario ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { eraseUser };