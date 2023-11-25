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
            const sql = `INSERT INTO assets_wallets (id_wallet, name, amount) VALUES ${placeholders}`;
            const values = assets.flatMap(asset => [idWallet, asset.name, asset.amount]);
            
            return await executeQuery(sql, values);
        } catch (error) {
            console.error('Something wrong happened:', error);
            throw error;
        }
    }
    
}

module.exports = DAOWallet;