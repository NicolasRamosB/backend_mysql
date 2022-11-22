const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IoServer} = require('socket.io');

const knexConfig = require('./db/config');
const Container = require('./class/Container');

const indexRouter = require('./src/routes/index');
const errorHandler = require('./src/middlewares/error.middleware');
const pageNotFound = require('./src/middlewares/notfound.middleware');

const app = express()
const http = new HttpServer(app);
const io = new IoServer(http);

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/static', express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(indexRouter);

io.on('connection', async (socket) => {
  const messages = new Container(knexConfig, `messages`); 
  const products = new Container(knexConfig, `products`);
  
  console.log('Nuevo cliente conectado.');

  socket.emit('UPDATE_MESSAGES', await messages.getAll());
  socket.on('NEW_MESSAGE_TO_SERVER', async data => {
    const message = await messages.save(data)
    io.sockets.emit('NEW_MESSAGE_FROM_SERVER', message);
  })

  socket.emit('UPDATE_PRODUCTS', await products.getAll() );
  socket.on('NEW_PRODUCT_TO_SERVER', async (data) => {
    const product = await products.save(data)
    io.sockets.emit('NEW_PRODUCTS_FROM_SERVER', product);
  })
})

app.use(errorHandler);
app.use(pageNotFound);

module.exports = http;