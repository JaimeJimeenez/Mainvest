'use strict'

const router = require('express').Router();

const { addAlert } = require('../controllers/alert/add.alert.controller');
const { deleteAlert } = require('../controllers/alert/delete.alert.controller');
const { getUserAlerts } = require('../controllers/alert/get.alert_user.controller');

router.get('/user/:id', getUserAlerts);
router.delete('/:id', deleteAlert);
router.post('/add', addAlert);

module.exports = router;