const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log("connected to Database " + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log("Database Error " + err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// Cor MiddleWare
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser MiddleWare
app.use(bodyParser.json());

// Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send("Invalid EndPoint! Adios ...   ");
})

// Start Server
app.listen(port, () => {
    console.log('server started on port '+port);
});