var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird')

const AppDAO = require('./db/dao');
const AppointmentRepository = require('./model/appointmentRepository')
const ClientRepository = require('./model/clientRepository')
const HairdresserRepository = require('./model/hairdresserRepository')

// parsuje dane typu application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

//main
const mainController = require('./controller/mainController');
app.use('/main', mainController.route);
//clients
const clientController = require('./controller/clientController');
app.use('/clients', clientController.route);
//hairdressers
const hairdresserController = require('./controller/hairdresserController');
app.use('/hairdressers', hairdresserController.route);


var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Server is listening at http://%s:%s', host, port)

})

// const dao = new AppDAO('db/database.db')

// module.exports.dao = dao;

