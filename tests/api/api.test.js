const mongoose = require('mongoose');
const { expect } = require('chai');
const supertest = require('supertest');
const { app } = require('../../server');

require("dotenv").config();

let request;
let server;

const productMock = {
    title: "Vinilo desde test",
    price: "32131",
    thumbnail: "test"
}

const productPutMock = {
    title: "Vinilo desde test MODIFICADO",
    price: "32131",
    thumbnail: "test"
}

describe("test api rest full", () => {
    before(async function () {
        await connectDb();
        server = await startServer();

        request = supertest(`http://localhost:${server.address().port}`);
  });

  after(function () {
    mongoose.disconnect();
    server.close();
  });

  describe("GET", () => {
    it("debería retornar un status 200", async () => {
      const response = await request.get("/productos");
      expect(response.status).to.eql(200);
    });
  });

  describe("POST", () => {
    it("debería incorporar un producto", async () => {
      const response = await request.post("/productos").send(productMock);
      expect(response?.status).to.eql(302);

      const productResponse = response?.request?._data;

      expect(productResponse).to.include.keys("title", "price", "thumbnail");
      expect(productResponse.title).to.eql(productMock.title);
      expect(productResponse.price).to.eql(productMock.price);
      expect(productResponse.thumbnail).to.eql(productMock.thumbnail);
    });
  });

  describe("Delete", () => {
    it("debería eliminar un producto", async () => {
      const response = await request.delete(`/productos/638eb714c69cc1e3ecbb53aa`);
      expect(response?.status).to.eql(200);
    });
  });

  describe("PUT", () => {
    it("debería modificar un producto", async () => {
      const response = await request.put("/productos/638eb73163324dff7c5d7d77").send(productPutMock);
      expect(response?.status).to.eql(200);
    });
  });
});



async function connectDb() {
  const URL = process.env.MONGO_URI;
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos conectada!");
  } catch (error) {
    throw new Error(`Error de conexión en la base de datos: ${err}`);
  }
}

async function startServer() {
  return new Promise((resolve, reject) => {
    const PORT = 0;
    const server = app.listen(PORT, () => {
      console.log(
        `Servidor express escuchando en el puerto ${server.address().port}`
      );
      resolve(server);
    });
    server.on("error", (error) => {
      console.log(`Error en Servidor: ${error}`);
      reject(error);
    });
  });
}
