const Crypto = require('crypto');
const connect = require('../database/connection');

module.exports = {
    async index(req, resp) {
        const ongs = await connect('ongs').select('*');
        return resp.json(ongs)
    },

    async create(req, resp) {
        const { name, email, whatsapp, city, uf } = req.body
    
        const id = Crypto.randomBytes(4).toString('HEX');
    
        await connect('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        return resp.json({ id })
    }
}