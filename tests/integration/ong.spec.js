const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe("ONG with API", () => {

  beforeAll(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it("Test create ONG", async () => {
      const response = await request(app).post('/ongs').send({
        name: "ABAP6",
        email: "email@abap.com",
        whatsapp: "11963107103",
        city: "São Paulo",
        uf: "SP"
      });

      expect(response.body).toHaveProperty('id')
      expect(response.body.id).toHaveLength(8);
  })

});
