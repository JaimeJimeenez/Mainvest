'use strict'
const express = require('express');
const DAOAuth = require('../DAO/auth');
const DAOUser = require('../DAO/user');

const router = express.Router();
const daoAuth = new DAOAuth();
const daoUser = new DAOUser();

router.post('/updateUser', async (request, response) => {
    try {
        const { newUsername, oldUsername } = request.body;
        let result = await daoAuth.getUser(newUsername, '');
        if (result.data.length) {
            result.status = 409;
            response.json({ result });
            return;
        }

        result = await daoUser.updateUsername(newUsername, oldUsername);
        response.json({ result });
    } catch (error) {
        response.json(error);
    }
});

router.post('/updatePassword', async (request, response) => {
    try {
        const { username, password } = request.body;
        const result = await daoUser.updatePassword(username, password);
        response.json({ result });
    } catch (error) {
        response.json(error);
    }
});


module.exports = router;