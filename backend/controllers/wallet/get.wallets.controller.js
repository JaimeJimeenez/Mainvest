'use strict'

const DAOWallet = require('../../DAO/wallet');

const daoWallet = new DAOWallet();

const getWallets = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await daoWallet.getWallets(id);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { getWallets };