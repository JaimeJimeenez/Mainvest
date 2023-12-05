'use strict'
const express = require('express');
const DAOWallet = require('../DAO/wallet');

const router = express.Router();
const daoWallet = new DAOWallet();

router.post('/new', async (request, response) => {
    try {
        const { idUser, wallet } = request.body;
        const result = await daoWallet.createWallet(idUser, wallet);
        response.json({ result });
    } catch (error) {
        response.json(error);
    }
});

router.post('/add_assets', async (request, response) => {
    try {
        const { idWallet, assets } = request.body;
        const result = await daoWallet.addAssets(idWallet, assets);
        response.json({ result });
    } catch (error) {
        response.json(error);
    }
});

router.get('/list/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoWallet.getWallets(id);
        response.json(result);
    } catch (error) {
        response.json(error);
    }
});

router.get('/assets_wallet/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoWallet.getAssets(id);
        response.json(result);
    } catch (error) {
        response.json(error);
    }
});

router.get('/name/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoWallet.getWalletName(id);
        response.json(result);
    } catch (error) {
        response.json(error);
    }
})

router.post('/remove', async (request, response) => {
    try {
        const { idWallet } = request.body;
        const result = await daoWallet.removeWallet(idWallet);
        response.json({ result });
    } catch (error) {
        response.json(error);
    }
});

module.exports = router;