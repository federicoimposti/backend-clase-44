const express = require('express');
const router = express.Router();
const productFormRouter = require('./productForm');
const productsRouter = require('./products');
// const productsFakerRouter = require('./productsFaker');
const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const loginError = require('./loginError');
const info = require('./info');
const randoms = require('./randoms');
const logger = require('../logs/logger');
const error = require('./errors');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('../graphql/buildSchema');
const { getProducts, saveProducts, deleteProduct, updateProduct } = require('../controllers/productsGraphql');

router.use((req, res, next) => {
    logger.info(`Ruta: '${req.originalUrl}' - Método '${req.method}'`);
    next();
});

router.use('/', productFormRouter);

router.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: {
        getProducts,
        saveProducts,
        deleteProduct,
        updateProduct
      },
      graphiql: true,
    })
);

router.use('/productos', productsRouter);
// router.use('/api/productos-test', productsFakerRouter);
router.use('/api/randoms', randoms);
router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/login-error', loginError);
router.use('/info', info);
router.all('*', error);

module.exports = router;