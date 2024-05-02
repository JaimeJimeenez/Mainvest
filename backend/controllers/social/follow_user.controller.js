'use strict'

const DAOSocial = require('../../DAO/social');

const daoSocial = new DAOSocial();

const followUser = async (request, response) => {
    try {
        const { newFollower } = request.body;
        const { idFollowing, idFollower } = newFollower;
        const result = await daoSocial.followUser(idFollowing, idFollower);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al intentar seguir a otro usuario: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { followUser };