const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
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
const messageRoute = require('./routes/messageRoute')
const {requireAuth, checkUser} = require('./middleware/authMiddleware');
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express();
const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//View engine
app.set('view engine', 'ejs')

//Database connection

const mongoURL = "mongodb+srv://thinhnguyenphuc:6RUfHulVdn6qLyO8@thinhnguyenphuc.dxqeq.mongodb.net/TravelSocial?retryWrites=true&w=majority&appName=thinhnguyenphuc";
mongoose.connect(mongoURL)
    .then(console.log("Db is connected"))
    .catch(error => console.log(error));

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT)
})


//Route
//app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'))
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


app.use(errorHandler);