const connect = require('../database/connection');

module.exports = {
    async index (req, resp) {
        const ong_id = req.headers.authorization;
        const list = await connect('incidents')
            .where('ong_id', ong_id)
            .select('*');
        return resp.json(list)
    }
}