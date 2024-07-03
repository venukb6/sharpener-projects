const bodyParser = require('body-parser');
const express = require('express')
var cors = require('cors')
const path = require('path')

const sequelize = require('./util/database')
const adminRoute = require('./routes/admin')

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))



app.use('/admin', adminRoute)



sequelize
    .sync()
    .then(result => {
        // console.log(result)
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    })