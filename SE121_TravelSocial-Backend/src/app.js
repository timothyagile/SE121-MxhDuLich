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

const authRoute = require('./routes/authRoute')
const locationRoute = require('./routes/locationRoute')
const businessRoute = require('./routes/businessRoute')
const roomRoute = require('./routes/roomRoute')
const bookingRoute = require('./routes/bookingRoute')
const recommendationRoute = require('./routes/recommendationRoute')
const userCollectionRoute = require('./routes/userCollectionRoute')
const uploadImageRoute = require('./routes/uploadImageRoute')
const invoiceRoute = require('./routes/invoiceRoute')
const paymentRoute = require('./routes/paymentRoute')
const serviceRoute = require('./routes/serviceRoute')
const conversationRoute = require('./routes/conversationRoute')
const messageRoute = require('./routes/messageRoute')
const reviewRoute = require('./routes/reviewRoute')
const VNPayRoute = require('./routes/vnpayRoute')
const postRoute = require('./routes/postRoute')
const executeCronJobRoute = require('./routes/executeCronJobRoute')

const {requireAuth, checkUser} = require('./middleware/authMiddleware');
const {errorHandler} = require('./middleware/errorMiddleware')
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

app.use(authRoute)
app.use(locationRoute)
app.use(bookingRoute)
app.use(businessRoute)
app.use(roomRoute)
app.use(userCollectionRoute)
app.use(uploadImageRoute)
app.use(recommendationRoute)
app.use(paymentRoute)
app.use(invoiceRoute)
app.use(serviceRoute)
app.use(messageRoute)
app.use(reviewRoute)
app.use(conversationRoute)
app.use(VNPayRoute)
app.use(postRoute)
app.use(executeCronJobRoute)

//Handle error
app.use(errorHandler);

module.exports = app;