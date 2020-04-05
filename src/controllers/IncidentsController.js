const connect = require("../database/connection");

module.exports = {
  async index(req, resp) {
    const { page = 1 } = req.query;

    const [count] = await connect("incidents")
      .select("*")
      .count();

    const incidents = await connect("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);

    resp.header("X-Total-Count", count["count(*)"]);

    return resp.json(incidents);
  },

  async create(req, resp) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connect("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return resp.json({ id });
  },

  async delete(req, resp) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connect("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if ((incident.ong_id = !ong_id)) {
      return resp.status(401).json({ error: "Operation not permitted." });
    }

    await connect("incidents")
      .where("id", id)
      .delete();
    return resp.status(204).send();
  }
};
