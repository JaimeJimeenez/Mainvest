'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const DAOAuth = require('../../DAO/auth');

const daoAuth = new DAOAuth();

function setToken(username) {
    return jwt.sign(
        { username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '2h' }
    )
}

const signUp = async (request, response) => {
    try {
        console.log('Inicio de registro...');
        const { newUser } = request.body;
        const { username, name, password, email } = newUser;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Datos del usuario a registrar... ${ username }, ${ name }, ${ hashedPassword }, ${ email }`);

        const user_data = await daoAuth.signUp(username, name, hashedPassword, email);
        
        const token = setToken(username);
        const result = {
            success: true,
            data: {
                id: user_data.data[0].id,
                name,
                username,
                token
            }
        };
        console.log(`Resultado de la operación... ${JSON.stringify(result)}`);
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'Se ha producido un error inesperado' });
    }
}

module.exports = { signUp };