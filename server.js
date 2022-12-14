const express = require('express');
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const compression = require("compression");
dotenv.config();

const app = express();

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const MongoStore = require("connect-mongo");

const advanceOptions = {
useNewUrlParser: true,
useUnifiedTopology: true,
};

app.use(cookieParser());

let mongoUrl = process.env.MONGO_URI;

app.use(
  session({
      store: new MongoStore({ 
          mongoUrl: mongoUrl,
          mongoOptions: advanceOptions   
      }),     
      secret: 'coderhouse',
      resave: true,
      saveUninitialized: true,
      rolling: true,
      cookie: { maxAge: 600000 },
  })
);

app.use(compression());
app.use(passport.initialize());
app.use(passport.session());

const router = require('./routes');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const { getProductsService, saveProductsService } = require('./services/products');
const { getChatService, saveChatService } = require('./services/chat');

io.on('connection', async function(socket) {
  console.log('Un cliente se ha conectado');

  socket.emit('products', await getProductsService());
  socket.emit('messages', await getChatService());

  socket.on('new-message', async (data) => {
      await saveChatService(data);
      io.sockets.emit('messages', await getChatService());
  });

  socket.on('new-product', async (data) => {
      await saveProductsService(data);
      io.sockets.emit('products', await getProductsService());
  });
});

let PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});

module.exports = { app };