const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const AppDAO = require('../db/dao');
const HairdresserRepository = require('../model/hairdresserRepository')
const dao = new AppDAO('db/database.db')
const hairdresserRepo = new HairdresserRepository(dao)

router.get("/", (req, res, next) => {

    hairdresserRepo.getAll()
    .then( (hairdressers) => {
      res.render('hairdressers/hairdresserList', {hairdressers: hairdressers});
    })
    .catch(err => {
      console.log(err);
    });


});

router.get("/hairdresserAddForm", (req, res, next) => {
    res.render('hairdressers/hairdresserAdd', { pageTitle: "Nowy użytkownik", formAction: "add", hairdresser: {} });
});

router.get("/hairdresserEditForm", (req, res, next) => {
    var id = req.query.id_hairdresser;

    hairdresserRepo.getById(id).then( (hairdresser) => {
      res.render('hairdressers/hairdresserEdit', { pageTitle: "Edytuj Fryzjera: "+hairdresser.name_hairdresser+' '+hairdresser.surname_hairdresser, formAction: "edit", hairdresser: hairdresser });
    })
    .catch(err => {
      console.log(err)
    })

});

router.post("/add", [
    check('hairdresser_name').matches("\\b([A-Z])(\\S*?)\\b"),
    check('hairdresser_surname').matches("\\b([A-Z])(\\S*?)\\b"),
    check('hairdresser_name').isLength({ min: 3 }),
    check('hairdresser_surname').isLength({ min: 3 }),
    check('hairdresser_phone').matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/)
  ], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.redirect("/hairdressers/hairdresserAdd");
       console.log({ errors: errors.array() });
    } else {
        hairdresserRepo.create(req.body.hairdresser_name, req.body.hairdresser_surname, req.body.hairdresser_phone, req.body.hairdresser_empdate);
        res.redirect("/hairdressers");
        console.log('new hairdresser added succesfully');
    }

});

router.post("/edit", [
    check('hairdresser_name').matches("\\b([A-Z])(\\S*?)\\b"),
    check('hairdresser_surname').matches("\\b([A-Z])(\\S*?)\\b"),
    check('hairdresser_name').isLength({ min: 3 }),
    check('hairdresser_surname').isLength({ min: 3 }),
    check('hairdresser_phone').matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/)
  ], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       console.log({ errors: errors.array() });
    } else {
    
        hairdresserRepo.update(req.body.hairdresser_id, req.body.hairdresser_name, req.body.hairdresser_surname, req.body.hairdresser_phone, req.body.hairdresser_empdate)
        res.redirect("/hairdressers");
        console.log('hairdresser edited succesfully');
    }
    
});

router.get("/showDetails", (req, res, next) => {
  var id = req.query.id_hairdresser;

  let name;
  let surname;
  hairdresserRepo.getById(id).then((hairdresser) => {
        name = hairdresser.name_hairdresser
        surname = hairdresser.surname_hairdresser  
  })

  hairdresserRepo.getDetails(id)
    .then((hairdresser) => {
   
      res.render('hairdressers/hairdresserDetails', { pageTitle: "Historia wizyt u fryzjera: " + name + " " + surname, hairdresser: hairdresser });
    })
    .catch(err => {
      console.log(err);
    });

});

router.get("/delete", (req, res, next) => {
    var id = req.query.id_hairdresser;
    
    hairdresserRepo.delete(id)
    
    res.redirect("/hairdressers");

});


module.exports.route = router; 