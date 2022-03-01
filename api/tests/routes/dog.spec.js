/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, Temperament , conn } = require('../../src/db.js');

const agent = session(app);

const dog = {
  name: "TEST",
  height_min: "1",
  height_max: "2",
  weight_min: "3",
  weight_max: "4",
  life_span: "5",
  image: "https://accentsconagua.com/img/images_15/testing-in-nodejs_7.png",
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  
  describe("GET /dog", () => {
    
    it("should get 200", () => agent.get('/dog').expect(200));

    it("should get 200 (buscando por query una raza(Golden Retriever))", () =>
      agent.get("/dog?name=Golden Retriever").expect(200));

    it("should get 200 (buscando por ID)", () =>
      agent.get("/dog/48").expect(200));

  });
});
