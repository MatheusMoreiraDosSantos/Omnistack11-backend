const request = require("supertest");
const app = require("../../../src/app");
const connection = require("../../database/connection");
describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.lastet();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "TESTE",
        email: "teste@teste.com",
        whatsapp: "14991055385",
        city: "testenopolis",
        uf: "TT"
      });
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
