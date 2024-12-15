const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User')
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(express.json());

const mongoURL = "mongodb+srv://thinhnguyenphuc:6RUfHulVdn6qLyO8@thinhnguyenphuc.dxqeq.mongodb.net/TravelSocial?retryWrites=true&w=majority&appName=thinhnguyenphuc";
mongoose.connect(mongoURL)
    .then(console.log("Db is connected"))
    .catch(error => console.log(error));

app.get("/", (req, res) => {
    res.send({status: "Started"})
})

app.post("/login", async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userEmail: userName});
        if(!user) {
            res.status(401).send("This user hasn't register before!");
        }
        console.log(user)
        if(password !== user.userPassword) {
            res.status(401).send("Password incorrcect");
        }
        res.status(200).json({
            isSucess: true,
            data: "Login success",
            error: null
        })
    }
    catch (error) {
        console.log(error);
        res.send({status: "error login", error });
    }
})

app.listen(3000, () => {
    console.log('Server is started!')
})