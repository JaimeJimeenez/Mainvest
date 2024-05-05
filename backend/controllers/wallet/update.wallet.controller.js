'use strict'

const DAOWallet = require('../../DAO/wallet');

const daoWallet = new DAOWallet();

const updateWallet = async (request, response) => {
    try {
        const { updateWallet } = request.body;
        const { idAsset, amount } = updateWallet;
        const result = daoWallet.updateWallet(idAsset, amount);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { updateWallet };