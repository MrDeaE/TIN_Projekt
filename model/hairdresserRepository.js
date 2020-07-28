// hairdresserRepository.js

class HairdresserRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS hairdressers (
            id_hairdresser INTEGER PRIMARY KEY AUTOINCREMENT, 
            name_hairdresser TEXT NOT NULL, 
            surname_hairdresser TEXT NOT NULL, 
            phone_hairdresser TEXT NOT NULL, 
            empDate_hairdresser DATE NOT NULL 
            )`;
        return this.dao.run(sql)
    }


    create(name, surname, phone, empDate) {
        return this.dao.run(
            `INSERT INTO hairdressers(name_hairdresser, surname_hairdresser, phone_hairdresser, empDate_hairdresser)
        VALUES (?, ?, ?, ?)`,
            [name, surname, phone, empDate])
    }

    update(id, name, surname, phone, empDate) {
        return this.dao.run(
            `UPDATE hairdressers
                SET name_hairdresser = ?,
                surname_hairdresser = ?,
                phone_hairdresser = ?,
                empDate_hairdresser = ?
                WHERE id_hairdresser = ?`,
            [name, surname, phone, empDate, id]
        )
    }

    getDetails(id){
        return this.dao.all(`SELECT * FROM hairdressers inner join
        appointment on hairdressers.id_hairdresser=appointment.id_hairdresser
        inner join clients on
        clients.id_client=appointment.id_client
        where hairdressers.id_hairdresser = ?`,
        [id]
        )
      }

    delete(id) {
        return this.dao.run(
          `DELETE FROM hairdressers WHERE id_hairdresser = ?`,
          [id]
        )
      }

      getById(id) {
        return this.dao.get(
          `SELECT * FROM hairdressers WHERE id_hairdresser = ?`,
          [id])
      }

      getAll() {
        return this.dao.all(`SELECT * FROM hairdressers`)
      }

}

module.exports = HairdresserRepository;