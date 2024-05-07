'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const DAOAuth = require('../../DAO/auth');

const daoAuth = new DAOAuth();

function setToken(username) {
    return jwt.sign(
        { username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '2h' }
    )
}

const logIn = async (request, response) => {
    try {
        console.log('Inicio de sesión...');
        const { user } = request.params;
        const { username, password } = JSON.parse(user);

        console.log(`Datos de usuario a iniciar sesión... ${ username }, ${ password }`);

        const loginUser = await daoAuth.logIn(username);
        const matchedPassword = bcrypt.compareSync(password, loginUser.data[0].password);
        
        if (matchedPassword) {
            const token = setToken(username);
            const result = {
                success: true,
                data: {
                    id: loginUser.data[0].id,
                    token
                }
            };
            console.log(`Resultado de la operación... ${ JSON.stringify(result) }`);
            return response.status(200).json(result);
        } else {
            return response.status(404).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        } 
    } catch (error) {
        return response.status(500).json({ message: 'Se ha producido un error inesperado' });
    }
}

module.exports = { logIn };