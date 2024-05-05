'use strict'

const DAOWallet = require('../../DAO/wallet');

const daoWallet = new DAOWallet();

function createPlaceholder(groups) {
    const placeholder = [];
    for (let i = 0; i < groups; i++) {
        placeholder.push(`($${i * 2 + 1}, $${i * 2 + 2})`);
    }
    return placeholder.join(', ');
}

const assignIds = async (request, response) => {
    try {
        const { idsWalletAssets } = request.body;
        const placeholder = createPlaceholder(idsWalletAssets.length / 2);
        const result = await daoWallet.assignIds(idsWalletAssets, placeholder);
        response.status(200).json(result);
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { assignIds };