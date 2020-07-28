const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const AppDAO = require('../db/dao');
const ClientRepository = require('../model/clientRepository')


const dao = new AppDAO('db/database.db')
const clientRepo = new ClientRepository(dao)


router.get("/", (req, res, next) => {

  clientRepo.getAll()
    .then((clients) => {
      res.render('clients/clientList', { clients: clients });
    })
    .catch(err => {
      console.log(err);
    });

});

router.get("/clientAddForm", (req, res, next) => {
  res.render('clients/clientAdd', { pageTitle: "Nowy użytkownik", formAction: "add", client: {} });

});

router.get("/clientEditForm", (req, res, next) => {

  var id = req.query.id_client;


  clientRepo.getById(id).then((client) => {
    res.render('clients/clientEdit', { pageTitle: "Edytuj Klienta: " + client.name_client + ' ' + client.surname_client, formAction: "edit", client: client });
  })
    .catch(err => {
      console.log(err)
    })


});

router.post("/add", [
  check('client_name').matches("\\b([A-Z])(\\S*?)\\b"),
  check('client_surname').matches("\\b([A-Z])(\\S*?)\\b"),
  check('client_name').isLength({ min: 3 }),
  check('client_surname').isLength({ min: 3 }),
  check('client_mail').isEmail(),
  check('client_phone').matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/)
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() });
  } else {
    clientRepo.create(req.body.client_name, req.body.client_surname, req.body.client_mail, req.body.client_phone);

    res.redirect("/clients");
    console.log('client added succesfully');
  }

});

router.post("/edit", [
  check('name_client').matches("\\b([A-Z])(\\S*?)\\b"),
  check('client_surname').matches("\\b([A-Z])(\\S*?)\\b"),
  check('name_client').isLength({ min: 3 }),
  check('client_surname').isLength({ min: 3 }),
  check('client_mail').isEmail(),
  check('client_phone').matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/)
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() });
  } else {
    clientRepo.update(req.body.client_id, req.body.name_client, req.body.client_surname, req.body.client_mail, req.body.client_phone)
    res.redirect("/clients");
    console.log('client edited succesfully');
  }

});

router.get("/showDetails", (req, res, next) => {
  var id = req.query.id_client;

  let name;
  let surname;
  clientRepo.getById(id).then((client) => {
        name = client.name_client
        surname = client.surname_client  
  })

  clientRepo.getDetails(id)
    .then((appointment) => {
   
      res.render('clients/appointmentHistory', { pageTitle: "Historia wizyt klienta: " + name + " " + surname, appointment: appointment });
    })
    .catch(err => {
      console.log(err);
    });

});

router.get("/delete", (req, res, next) => {
  var id = req.query.id_client;

  clientRepo.delete(id)

  res.redirect("/clients");
});


module.exports.route = router;


