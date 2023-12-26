'use strict'
const executeQuery = require('../database/postgresql');

class DAOAsset {
    
    async modifyAsset(idWallet, nameAsset, amount) {
        try {
            const sql = 'Update assets_wallets set amount = $1 where id_wallet = $2 and name = $3';
            return await executeQuery(sql, [amount, idWallet, nameAsset]);
        } catch (error) {
            console.error(error.message);
            throw(error);
        }
    }
    
    async eraseAsset(idWallet, nameAsset) {
        try {
            const sql = 'Delete from assets_wallets where id_wallet = $1 and name = $2';
            return await executeQuery(sql, [idWallet, nameAsset]);
        } catch (error) {
            console.error(error);
            throw(error);
        }
    }
}

module.exports = DAOAsset;