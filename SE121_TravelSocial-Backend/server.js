const express = require('express');
const mongoose = require('mongoose')
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

const {requireAuth, checkUser} = require('./middleware/authMiddleware');
const {errorHandler} = require('./middleware/errorMiddleware')
const socketHandler = require('./socket/socketHandler')

//Khoi tao app
const app = express();
//Khoi tao socket
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3002');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  app.use(cors({
    origin: 'http://localhost:3001', // Domain của frontend
    credentials: true, // Cho phép gửi cookie
  }));

//View engine
app.set('view engine', 'ejs')

app.use(cors());


//Database connection

const mongoURL = "mongodb+srv://thinhnguyenphuc:6RUfHulVdn6qLyO8@thinhnguyenphuc.dxqeq.mongodb.net/TravelSocial?retryWrites=true&w=majority&appName=thinhnguyenphuc";
mongoose.connect(mongoURL)
    .then(console.log("Db is connected"))
    .catch(error => console.log(error));

//Xu ly su kien socket
socketHandler(io)

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT)
})


//Route
//app.get('*', checkUser)
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


app.use(errorHandler);