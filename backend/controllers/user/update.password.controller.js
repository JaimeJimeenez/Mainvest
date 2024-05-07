'use strict'

const DAOUser = require('../../DAO/user');
const bcrypt = require('bcryptjs');

const daoUser = new DAOUser();

const updatePassword = async (request, response) => {
    try {
        console.log('Actualizando la contraseña del usuario...');
        const { newPassword } = request.body;
        const { id, password } = newPassword;
        console.log(`Datos actualizados del usuario..., ${ id }, ${ password }`);

        const hashedPassword = await bcrypt.hash(password, 10);
        const update = await daoUser.updatePassword(id, hashedPassword);
        const result = {
            success: true,
            data: true
        }
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { updatePassword };