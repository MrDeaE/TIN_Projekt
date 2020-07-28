const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const AppDAO = require('../db/dao');
const ClientRepository = require('../model/clientRepository')
const HairdresserRepository = require('../model/hairdresserRepository')
const AppointmentRepository = require('../model/appointmentRepository')
const dao = new AppDAO('db/database.db')

const clientRepo = new ClientRepository(dao)
const appointmentRepo = new AppointmentRepository(dao)
const hairdresserRepo = new HairdresserRepository(dao)


router.get("/", (req, res, next) => {

    appointmentRepo.getAllWithNames()
    .then( (appointment) => {
      res.render('main/adminView', {appointment: appointment});
    })
    .catch(err => {
      console.log(err);
    });

});

router.get("/appointmentAddForm", (req, res, next) => {
 
appointmentRepo.getAllWithNames()
.then((client, hairdresser) => {
  res.render('main/appointmentAdd', {pageTitle: "Nowy użytkownik", formAction: "add", client: client});
})  
.catch(err => {
  console.log(err);
});

});

router.get("/appointmentEditForm", (req, res, next) => {
    var id = req.query.id_appointment;
    appointmentRepo.getById(id).then( (appointment) => {
      res.render('main/appointmentEdit', { pageTitle: "Edytuj Wizytę: ", formAction: "edit", appointment: appointment });
    })
    .catch(err => {
      console.log(err)
    })

});

router.post("/add", [
    check('appointment_date').not().isEmpty(),
    check('appointment_hour').not().isEmpty(),
    check('appointment_hairdresser').not().isEmpty(),
  ], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       console.log({ errors: errors.array() });
    } else {
        if(req.body.appointment_client == -1){
            clientRepo.create(req.body.appointment_client_name, req.body.appointment_client_surname, '-', req.body.appointment_client_phone)
           appointmentRepo.createWithNewClient(req.body.appointment_hairdresser, req.body.appointment_date, req.body.appointment_hour)
    
        } else{
            appointmentRepo.create(req.body.appointment_client, req.body.appointment_hairdresser, req.body.appointment_date, req.body.appointment_hour)
        }
        res.redirect("/main");
        console.log('new appointment added succesfully');
    }

});

router.post("/edit", [
    check('appointment_date').not().isEmpty(),
    check('appointment_hour').not().isEmpty(),
    check('appointment_hairdresser').not().isEmpty(),
  ], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       console.log({ errors: errors.array() });
    } else {
         appointmentRepo.update(req.body.id_appointment, req.body.appointment_date, req.body.appointment_hour, req.body.appointment_hairdresser)
        res.redirect("/main");
          
        console.log('appointment edited succesfully');
    }

});

router.get("/showDetails", (req, res, next) => {
    var id = req.query.id_appointment;


    appointmentRepo.getDetails(id)
    .then( (appointment) => {
      res.render('main/appointmentDetails', {pageTitle:"Szczegóły wizyty", appointment: appointment});
    })
    .catch(err => {
      console.log(err);
    });

});

router.get("/delete", (req, res, next) => {
    var id = req.query.id_appointment;
    
    appointmentRepo.delete(id);
    
    res.redirect("/main");
});


module.exports.route = router; 