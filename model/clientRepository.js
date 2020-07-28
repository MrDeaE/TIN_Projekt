// clientRepository.js

class ClientRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS clients (
          id_client INTEGER PRIMARY KEY AUTOINCREMENT, 
          name_client TEXT NOT NULL, 
          surname_client TEXT NOT NULL, 
          mail_client TEXT, 
          phone_client TEXT )`;
    return this.dao.run(sql)
  }


  create(name, surname, mail, phone) {
    return this.dao.run(
      `INSERT INTO clients(name_client, surname_client, mail_client, phone_client)
            VALUES (?, ?, ?, ?)`,
      [name, surname, mail, phone])
  }

  update(id, name, surname, mail, phone) {
    return this.dao.run(
      `UPDATE clients
          SET name_client = ?,
          surname_client = ?,
          mail_client = ?,
          phone_client = ?
          WHERE id_client = ?`,
      [name, surname, mail, phone, id]
    )
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM clients WHERE id_client = ?`,
      [id]
    )
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM clients WHERE id_client = ?`,
      [id])
  }

  getDetails(id){
    return this.dao.all(`SELECT * FROM appointment inner join
    clients on clients.id_client=appointment.id_client inner join
    hairdressers on hairdressers.id_hairdresser=appointment.id_hairdresser
    where clients.id_client = ?`,
    [id]
    )
  }

  getLast(){
    return this.dao.get(`SELECT max(id_client) FROM clients`)
  }

  getAll() {
    return this.dao.all(`SELECT * FROM clients`)
  }


}

module.exports = ClientRepository;