'use strict'
const express = require('express');
const jwt = require('jsonwebtoken');
const DAOAuth = require('../DAO/auth');

const router = express.Router();
const daoAuth = new DAOAuth();

function setToken(username) {
    return jwt.sign(
        { username },
        process.env.JWT_SECRET_KEY,
        { expiresIn : '2h' },
    )
}

router.post('/login', async (request, response) => {
    try {
        const { username } = request.body;
        await daoAuth.login(username)
            .then((result) => {
                const token = setToken(username);
                response.json({ result, token });
            });
    } catch (error) {
        response.json(error);
    }
});

router.post('/signup', async (request, response) => {
    try {
        const { username, password, email } = request.body;
        let result = await daoAuth.getUser(username, email);
        if (result.data.length) {
            result.status = 409;
            response.json({ result });
            return;
        }

        result = await daoAuth.signUp(username, password, email);
        const token = setToken(username);
        result.data.push({ username, password, email });
        response.json({ result, token }); 
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;