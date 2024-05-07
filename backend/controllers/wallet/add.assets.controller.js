'use strict'

const DAOWallet = require('../../DAO/wallet');

const daoWallet = new DAOWallet();

const addAssets = async (request, response) => {
    try {
        const { assets } = request.body;
        const result = await daoWallet.addAssets(assets);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { addAssets };