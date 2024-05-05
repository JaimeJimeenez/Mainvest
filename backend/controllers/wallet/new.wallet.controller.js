'use strict'

const DAOWallet = require('../../DAO/wallet');

const daoWallet = new DAOWallet();

const newWallet = async (request, response) => {
    try {
        const { newWallet } = request.body;
        const { idUser, name } = newWallet; 
        const result = await daoWallet.newWallet(idUser, name);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ message: 'Se ha producido un error inesperado'});
    }
}

module.exports = { newWallet };