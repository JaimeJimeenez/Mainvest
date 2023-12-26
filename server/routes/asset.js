'use strict'
const express = require('express');
const DAOAsset = require('../DAO/asset');

const router = express.Router();
const daoAsset = new DAOAsset();

router.post('/erase', async (request, response) => {
    try {
        const { idWallet, assetName } = request.body;
        const result = await daoAsset.eraseAsset(idWallet, assetName);
        response.json({ result });
    } catch (error) {
        response.json(error);
    }
});

router.post('/modify', async (request, response) => {
    try {
        const { idWallet, assetName, amount } = request.body;
        const result = await daoAsset.modifyAsset(idWallet, assetName, amount);
        response.json({ result });
    } catch (error) {
        response.json(error);
    }
});

module.exports = router;