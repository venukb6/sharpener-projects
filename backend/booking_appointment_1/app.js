const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');

const sequelize = require('./util/database');

const app = express();

app.use(express.json())
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const userController = require('./controllers/user');
const userRoute = require('./routes/user')


app.use('/user', userRoute)






sequelize
    .sync()
    .then(result => {
        // console.log(result)
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    });
