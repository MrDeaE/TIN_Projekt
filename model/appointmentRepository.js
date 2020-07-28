// appointmentRepository.js

class AppointmentRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS appointment(
        id_appointment INTEGER PRIMARY KEY AUTOINCREMENT,
        id_client INTEGER,
        id_hairdresser INTEGER,
        date TEXT NOT NULL,
        hour TEXT NOT NULL,
        FOREIGN KEY (id_client) 
            REFERENCES clients (id_client) 
                ON DELETE CASCADE,
        FOREIGN KEY (id_hairdresser) 
            REFERENCES hairdressers (id_hairdresser) 
                ON DELETE CASCADE 
            )`;
        return this.dao.run(sql)
    }

    create(id_client, id_hairdresser, date, hour) {
        return this.dao.run(
          `INSERT INTO appointment(id_client, id_hairdresser, date, hour)
            VALUES (?, ?, ?, ?)`,
          [id_client, id_hairdresser, date, hour])
      }
      createWithNewClient(id_hairdresser, date, hour){
        return this.dao.run(
          `INSERT INTO appointment(id_client, id_hairdresser, date, hour)
            VALUES ((select max(id_client) from clients), ?, ?, ?)`,
          [id_hairdresser, date, hour])
      }

      update(id_appointment, date, hour, id_hairdresser) {
        // const { id_appointment, id_client, id_hairdresser, date, hour } = appointment
        return this.dao.run(
          `UPDATE appointment SET id_hairdresser = ?, date = ?, hour = ? WHERE id_appointment = ?`,
          [ id_hairdresser, date, hour, id_appointment]
        )
      }

      delete(id) {
        return this.dao.run(
          `DELETE FROM appointment WHERE id_appointment = ?`,
          [id]
        )
      }

      getById(id) {
        return this.dao.get(
          `SELECT * FROM appointment WHERE id_appointment = ?`,
          [id])
      }

      getAll() {
        return this.dao.all(`SELECT * FROM appointment`)
      }

      getAllWithNames() {
        return this.dao.all(`SELECT * FROM appointment inner join
                clients on clients.id_client=appointment.id_client inner join
                hairdressers on hairdressers.id_hairdresser=appointment.id_hairdresser
        `)
      }

      getDetails(id) {
        return this.dao.all(`SELECT * FROM appointment inner join
                clients on clients.id_client=appointment.id_client inner join
                hairdressers on hairdressers.id_hairdresser=appointment.id_hairdresser
                where appointment.id_appointment = ?`,
                [id]
                )
      }

      getClientsAndHairdressers(){
        return this.dao.all(`SELECT * FROM clients union select * from hairdressers`)
      }

      getClients(clientId) {
        return this.dao.all(
          `SELECT * FROM appointment WHERE id_client = ?`,
          [clientId])
      }

      getHairdressers(hairdresserId) {
        return this.dao.all(
          `SELECT * FROM appointment WHERE id_hairdresser = ?`,
          [hairdresserId])
      }




}

module.exports = AppointmentRepository;