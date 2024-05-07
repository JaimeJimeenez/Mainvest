'use strict'

const router = require('express').Router();

const { deleteAlert } = require('../controllers/alert/delete.alert.controller');
const { getUserAlerts } = require('../controllers/alert/get.alert_user.controller');

router.get('/user/:id', getUserAlerts);
router.delete('/:id', deleteAlert);

module.exports = router;