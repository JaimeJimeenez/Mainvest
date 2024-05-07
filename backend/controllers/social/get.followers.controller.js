'use strict'

const DAOSocial = require('../../DAO/social');

const daoSocial = new DAOSocial();

const getFollowersUsers = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoSocial.getFollowersUsers(id);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener los usuarios que le siguen: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getFollowersUsers };