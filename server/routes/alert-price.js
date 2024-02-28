'use strict'
const express = require('express');
const DAOAlert = require('../DAO/alert');

const router = express.Router();
const daoAlert = new DAOAlert();

router.post('/add', async (request, response) => {
    try {
      const { idUser, asset, price } = request.body;
      const result = await daoAlert.addAlertPrice(idUser, asset, price);
      response.json(result);
    } catch (error) {
        response.json(error);
    }
});

router.get('/list/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoAlert.getAlertsPrice(id);
        response.json(result);
    } catch (error) {
        response.json(error);
    }
});

router.post('/delete', async (request, response) => {
    try {
        const { id } = request.body;
        const result = await daoAlert.eraseAlertPrice(id);
        response.json(result);
    } catch (error) {
        response.json(error);
    }
});

router.post('/update', async (request, response) => {
    try {
        const { ids } = request.body;
        const result = await daoAlert.updateAlertPrice(ids);
        response.json(result);
    } catch (error) {
        response.json(error);
    }
});

module.exports = router;