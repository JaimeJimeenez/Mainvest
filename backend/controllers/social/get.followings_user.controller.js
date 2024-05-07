'use strict'

const DAOSocial = require('../../DAO/social');

const daoSocial = new DAOSocial();

const getFollowingsUsers = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoSocial.getFollowingsUsers(id);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener los usuarios a los que sigue: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getFollowingsUsers };