const executeQuery = require('../database/postgresql');

class DAOWallet {

    async createWallet(idUser, name) {
        try {
            const sql = 'Insert into wallets (id_user, name) values ($1, $2) returning id';
            return await executeQuery(sql, [idUser, name]);
        } catch(error) {
            console.error('Something wrong happened: ', error);
        }
    }

    async addAssets(idWallet, assets) {
        try {
            const placeholders = assets.map((_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(', ');
            const sql = `Insert into assets_wallets (id_wallet, name, amount) values ${placeholders}`;
            const values = assets.flatMap(asset => [idWallet, asset.name, asset.amount]);
            return await executeQuery(sql, values);
        } catch (error) {
            console.error('Something wrong happened:', error);
            throw error;
        }
    }

    async updateAsset(idWallet, asset, amount) {
        try {
            const sql = 'Update assets_wallets set amount = amount + $1 where id_wallet = $2 and name = $3';
            return await executeQuery(sql, [amount, idWallet, asset]);
        } catch (error) {
            console.error('Something went wrong', error);
            throw error;
        }
    }

    async sellAsset(idWallet, asset, amount) {
        try {
            const sql = 'Update assets_wallets set amount = amount - $1 where id_wallet = $2 and name = $3';
            return await executeQuery(sql, [amount, idWallet, asset]);
        } catch (error) {
            console.error('Something went wrong', error);
            throw error;
        }
    }

    async sellAll(idWallet, asset) {
        try {
            const sql = 'Delete from assets_wallets where id_wallet = $1 and name = $2';
            return await executeQuery(sql, [idWallet, asset]);
        } catch (error) {
            console.error('Something went wrong', error);
            throw error;
        }
    }

    async getWalletsByAsset(idUser, asset) {
        try {
            const sql = 'select w.id, w.name, aw.amount from wallets w join users u on u.id = $1 join assets_wallets aw on aw.id_wallet = w.id and aw.name = $2';
            return await executeQuery(sql, [idUser, asset]);
        } catch (error) {
            console.error('Something wrong happened', error);
            throw error;
        }
    }
    
    async getWallets(idUser) {
        try {
            const sql = 'Select * from wallets where id_user = $1;';
            return await executeQuery(sql, [idUser]);
        } catch (error) {
            console.error('Something wrong happened: ', error);
            throw error;
        }
    }

    async getAssets(idWallet) {
        try {
            const sql = 'Select * from assets_wallets where id_wallet = $1;';
            return await executeQuery(sql, [idWallet]);
        } catch(error) {
            console.error('Something wrong happened: ', error);
            throw error;
        }
    }

    async removeWallet(id) {
        try {
            const sql = 'Delete from wallets where id = $1;';
            return await executeQuery(sql, [id]);
        } catch(error) {
            console.error('Something wrong happened: ', error);
            throw error;
        }
    }

    async getWalletName(id) {
        try {
            const sql = 'Select * from wallets where id = $1;';
            return await executeQuery(sql, [id]);
        } catch(error) { 
            console.error(`Something wrong happened ${error}`);
            throw error;
        }
    }
}

module.exports = DAOWallet;