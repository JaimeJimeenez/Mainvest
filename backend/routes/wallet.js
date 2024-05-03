'use strict'

const { getWallets } = require('../controllers/wallet/get.wallets.controller');

const router = require('express').Router();

router.get('/user/:id', getWallets);

module.exports = router;