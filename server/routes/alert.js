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

router.get('/list/:ids', async (request, response) => {
    try {
        const { ids } = request.params;
        const result = await daoAlert.getUsersByAlerts(ids);
        response.json(result);
    } catch (error) {
        response.json(error);
    }
});

module.exports = router;