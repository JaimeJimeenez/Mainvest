const executeQuery = require('../database/postgresql');

class DAOWallet {

    async getWallets(id) {
        try {
            const sql = 'select w.id, w.name, a.name as asset, a.amount from wallets w join wallets_assets wa on wa.id_wallet = w.id join assets a on a.id = wa.id_asset where w.id_user = $1;';
            return await executeQuery(sql, [id]);
        } catch (error) {
            throw error;
        }
    }

}

module.exports = DAOWallet 