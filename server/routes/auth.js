'use strict'
const express = require('express');
const jwt = require('jsonwebtoken');

const executeQuery = require('../database/postgresql');

const router = express.Router();

router.post('/login', async (request, response) => {
    try {
        const { username } = request.body;
        const sql = 'Select * from users where username = $1';
        const result = await executeQuery(sql, [ username ]);
        const token = jwt.sign(
            {
                userId: result.data[0].id,
                username: result.data[0].username,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn : '2h' }
        );
        response.json({ result, token });
    } catch (error) {
        response.status(500).json({ error });
    }
});

module.exports = router;