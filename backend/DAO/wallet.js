const executeQuery = require('../database/postgresql');

class DAOWallet {

    async newWallet(idUser, name) {
        try {
            const sql = 'Insert into wallets (id_user, name) values ($1, $2) returning id;';
            return await executeQuery(sql, [idUser, name]);
        } catch (error) {
            throw error;
        }
    }

    async addAssets(assets) {
        try {
            const input_assets = assets.map((asset) => (Object.values(asset))).flat();
            const placeholders = assets.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(', ');
            const sql = `Insert into assets (name, amount) values ${placeholders} returning id;`;
            return await executeQuery(sql, input_assets);
        } catch (error) {
            throw error;
        }
    }

    async getWallets(id) {
        try {
            const sql = 'select w.id, w.name, a.id as idAsset, a.name as asset, a.amount from wallets w join wallets_assets wa on wa.id_wallet = w.id join assets a on a.id = wa.id_asset where w.id_user = $1;';
            return await executeQuery(sql, [id]);
        } catch (error) {
            throw error;
        }
    }

    async assignIds(ids, placeholder) {
        try {
            const sql = `Insert into wallets_assets (id_wallet, id_asset) values ${placeholder};`;
            return await executeQuery(sql, ids);
        } catch (error) {
            throw error;
        }
    }

    async updateWallet(idAsset, amount) {
        try {
            const sql = 'Update assets set amount = amount + $1 where id = $2;';
            return await executeQuery(sql, [amount, idAsset]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOWallet;