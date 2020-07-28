
  db.run('CREATE TABLE clients (id_client INTEGER PRIMARY KEY, name_client TEXT NOT NULL, surname_client TEXT NOT NULL, mail_client TEXT, phone_client TEXT )');

let clients = [['Wojciech', 'Korfanty', 'wk@wp.pl', '123 456 789'],
        ['Władysław', 'Grabski', 'wg@onet.pl', '666 666 666'],
        ['Ignacy', 'Daszyński', 'id@mail.com', '111 111 111'],
        ['Józef', 'Piłsudski', 'jp@mail.com', '131 111 111'],
        ['Wincenty', 'Witos', 'ww@mail.com', '111 131 111'],
        ['Roman', 'Dmowski', 'rd@mail.com', '111 111 131']
    ];
 
// construct the insert statement with multiple placeholders
// based on the number of rows
let clientPlaceholders = clients.map(() => '(?, ?, ?, ?)').join(', ');
let clientQuery = 'INSERT INTO clients(name_client, surname_client, mail_client, phone_client) VALUES ' + clientPlaceholders;
let flatClient = [];
clients.forEach((arr) => { arr.forEach((item) => { flatClient.push(item) }) });

db.serialize(function(){
    db.run(clientQuery, flatClient, function(err){
        if(err) throw err;
        console.log(`Rows inserted ${this.changes}`);
    });
});


// printing clients
let sql = `SELECT id_client client_id, name_client client_name, surname_client client_surname, mail_client, phone_client FROM clients`;
 
db.each(sql, (err, row) => {
  if (err) {
    throw err;
  }
  console.log(`${row.client_id} ${row.client_name} ${row.client_surname} ${row.mail_client} ${row.phone_client}`);
});



//hairdressers

  db.run('CREATE TABLE hairdressers (id_hairdresser INTEGER PRIMARY KEY, name_hairdresser TEXT NOT NULL, surname_hairdresser TEXT NOT NULL, phone_hairdresser TEXT NOT NULL, empDate_hairdresser TEXT NOT NULL )');


  let hairdressers = [['Maciek', 'Kowalski', '123 456 789', new Date(2010, 10, 1)],
  ['Maciek', 'Wiśniewski', '666 666 666', new Date(2011, 5, 6)],
  ['Maciek', 'Nowak', '111 111 111', new Date(2014, 6, 30)],
  ['Maciek', 'Kowalczyk', '131 111 111', new Date(2011, 11, 1)],
  ['Maciek', 'Kowalewski', '111 131 111', new Date(2018, 1, 15)],
  ['Maciek', 'Dąbrowski', '111 111 131', new Date(2016, 2, 20)]
];

// construct the insert statement with multiple placeholders
// based on the number of rows
let hairdresserPlaceholders = hairdressers.map(() => '(?, ?, ?, ?)').join(', ');
let hairdresserQuery = 'INSERT INTO hairdressers(name_hairdresser, surname_hairdresser, phone_hairdresser, empDate_hairdresser) VALUES ' + hairdresserPlaceholders;
let flatHairdresser = [];
hairdressers.forEach((arr) => { arr.forEach((item) => { flatHairdresser.push(item) }) });

db.serialize(function(){
db.run(hairdresserQuery, flatHairdresser, function(err){
  if(err) throw err;
  console.log(`Rows inserted ${this.changes}`);
});
});


// printing hairdressers
let sql = `SELECT id_hairdresser, name_hairdresser, surname_hairdresser, phone_hairdresser, empDate_hairdresser FROM hairdressers`;

db.each(sql, (err, row) => {
if (err) {
throw err;
}
console.log(`${row.id_hairdresser} ${row.name_hairdresser} ${row.surname_hairdresser} ${row.phone_hairdresser} ${row.empDate_hairdresser}`);
});



//appointments

   
let sqlQuery = 'CREATE TABLE appointment('+
'id_appointment INTEGER PRIMARY KEY,'+
'id_client INTEGER,'+
'id_hairdresser INTEGER,'+
'date TEXT NOT NULL,'+
'hour TEXT NOT NULL,'+
'FOREIGN KEY (id_client) '+
   'REFERENCES clients (id_client) '+
      'ON DELETE CASCADE,'+
'FOREIGN KEY (id_hairdresser) '+
   'REFERENCES hairdressers (id_hairdresser) '+
      'ON DELETE CASCADE '+
')';
db.run(sqlQuery);


 let appointments = 
 [[2, 1, '2018-11-1', '11:30'],
 [1, 1, '2018-11-2', '12:30'],
 [2, 2, '2018-11-3', '11:00'],
 [3, 3, '2018-11-3', '11:30'],
 [4, 1, '2018-11-3', '12:00'],
 [3, 2, '2018-11-4', '10:00']
];

// construct the insert statement with multiple placeholders
// based on the number of rows
let appointmentPlaceholders = appointments.map(() => '(?, ?, ?, ?)').join(', ');
let appointmentQuery = 'INSERT INTO appointment(id_client, id_hairdresser, date, hour) VALUES ' + appointmentPlaceholders;
let flatAppointment = [];
appointments.forEach((arr) => { arr.forEach((item) => { flatAppointment.push(item) }) });

db.serialize(function(){
db.run(appointmentQuery, flatAppointment, function(err){
 if(err) throw err;
 console.log(`Rows inserted ${this.changes}`);
});
});


 // printing appointments
let sql = `SELECT id_appointment, id_client, id_hairdresser, date, hour FROM appointment`;

db.each(sql, (err, row) => {
if (err) {
throw err;
}
console.log(`${row.id_appointment} ${row.id_client} ${row.id_hairdresser} ${row.date} ${row.hour}`);
});