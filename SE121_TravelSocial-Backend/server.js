const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/authRoute')
const {requireAuth, checkUser} = require('./middleware/authMiddleware');
const app = express();
const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json());
app.use(cookieParser());


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

// app.get('/set-cookies', (req, res) => {

//     // res.setHeader('Set-Cookie', 'newUser=true');
    
//     res.cookie('newUser', false);
//     res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
  
//     res.send('you got the cookies!');
  
//   });
  
//   app.get('/read-cookies', (req, res) => {
  
//     const cookies = req.cookies;
//     console.log(cookies.newUser);
  
//     res.json(cookies);
  
//   });   

//Route
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'))
app.get('/signup', (req, res) => {res.render('signup')})
app.get('/signin', (req, res) => {res.render('signin')})
app.use(authRoute)

