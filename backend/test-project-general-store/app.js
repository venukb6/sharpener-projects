const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const sequelize = require('./utils/database');

app.use(express.json())
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

const storeRoute = require('./routes/store')


app.use('/store', storeRoute)

sequelize
    .sync()
    .then(result => {
        // console.log(result)
        app.listen(5000, ()=> {
            console.log('server listening at port 5000')
        });
    })
    .catch(err => {
        console.log(err)
    });