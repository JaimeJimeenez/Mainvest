'use strict'

const DAOUser = require('../../DAO/user');

const daoUser = new DAOUser();

const getUsername = async (request, response) => {
    try {
        console.log('Obteniendo el nombre de usuario...');
        const { id } = request.params;
        console.log('Id del nombre de usuario:...', +id);

        const username = await daoUser.getUsername(+id);
        if (username.data.length) {
            const result = {
                success: true,
                data: {
                    username: username.data[0].username
                }
            };
            console.log(`Resultado de la operación... ${ JSON.stringify(result) }`);
            response.status(200).json(result);
        } else {
            response.status(404).json({ message: 'No existe el usuario' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getUsername };