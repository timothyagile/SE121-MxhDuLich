const express = require('express');
const app = express();


require('dotenv').config();
//require('./utils/cronJobs'); // Chạy cron job tự động

const helmet = require('helmet') 
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const http = require('http');
const path = require('path');
const cors = require('cors');
const {Server} = require('socket.io')

const routes = require('./routes/index')

const {requireAuth, checkUser} = require('./middleware/auth.middleware');
const {errorHandler} = require('./middleware/error.middleware')
const socketHandler = require('./socket/socketHandler');
const compression = require('compression');

//Init middleware

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3002');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//Init dbs

require('./databases/init.mongodb');
const {countConnect, checkOverload} = require('./helpers/check.connect'); 
countConnect()
//checkOverload()

//Handle routers

app.get('/', (req, res) => res.render('signin'))
app.get('/signup', (req, res) => {res.render('signup')})
app.get('/signin', (req, res) => {res.render('signin')})

app.use('', routes)

//Handle error
app.use(errorHandler);

module.exports = app;