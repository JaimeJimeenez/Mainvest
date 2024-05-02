'use strict'

const DAOSocial = require('../../DAO/social');

const daoSocial = new DAOSocial();

const unfollowUser = async (request, response) => {
    try {
        const { idFollowing, idFollower } = request.params;
        const result = await daoSocial.unfollowUser(+idFollowing, +idFollower);
        response.status(200).json(result);
    } catch (error) {
        console.log(`Error al intentar dejar de seguir a un usuario: ${JSON.stringify(error)}`);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { unfollowUser };