// dao.js

const sqlite3 = require('sqlite3').verbose()
const Promise = require('bluebird')

class AppDAO {
  
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
            console.log('Could not connect to database', err)
          } else {
            // console.log('Connected to database with DAO')
          }
        })
      }
    
  
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql (run command): ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql (get command): ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql (all command): ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }


}

module.exports = AppDAO;