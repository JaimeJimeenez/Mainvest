'use strict'
const express = require('express');
const DAOAlert = require('../DAO/alert');

const router = express.Router();
const daoAlert = new DAOAlert();

router.get('/list/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoAlert.getAlerts(id);
        response.json(result);
    } catch (error) {
        response.json(error);
    }
});

router.post('/delete', async (request, response) => {
    try {
        const { id } = request.body;
        const result = await daoAlert.deleteAlert(id);
        response.json(result);
    } catch (error) {
        response.json(error);
    }
});

module.exports = router;