'use strict'

const DAOUser = require('../../DAO/user');

const daoUser = new DAOUser();

const updateMoney = async (request, response) => {
    try {
        const { updateMoney } = request.body;
        const { id, money } = updateMoney;
        const result = await daoUser.updateMoney(id, money);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { updateMoney };