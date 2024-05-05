'use strict'

const { addAssets } = require('../controllers/wallet/add.assets.controller');
const { assignIds } = require('../controllers/wallet/assing.ids.controller');
const { eraseWallet } = require('../controllers/wallet/erase.wallet.controller');
const { getWallets } = require('../controllers/wallet/get.wallets.controller');
const { newWallet } = require('../controllers/wallet/new.wallet.controller');
const { updateWallet } = require('../controllers/wallet/update.wallet.controller');

const router = require('express').Router();

router.post('/new', newWallet);
router.post('/add_assets', addAssets);
router.post('/assign_ids', assignIds);
router.get('/user/:id', getWallets);
router.put('/update', updateWallet);
router.delete('/erase/:id', eraseWallet);

module.exports = router;