const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Producto {
    _id: ID!
    title: String,
    price: String,
    thumbnail: String
  }

  input ProductoInput {
    title: String,
    thumbnail: String,
    price: String,
  }

  type Query {
    getProducts: [Producto],
  }

  type Mutation {
      saveProducts(datos: ProductoInput): Producto,
      deleteProduct(_id: ID!): Producto,
      updateProduct(_id: ID!, datos: ProductoInput): Producto,
  }
`);

module.exports = { schema };