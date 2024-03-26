const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/TheAppData')

db.serialize(() => {

  let sqlQuery = "CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT)"
  db.run(sqlQuery)
})

exports.authenticate = function(username, password, callback) {

  let sqlQuery = "SELECT * FROM users WHERE username = ? AND password = ?"

  db.get(sqlQuery, [username, password], (err, row) => {

    if(err || !row)
      callback(false)
    else
      callback(true)
  })
}

exports.addUser = function(username, password, callback) {

  let sqlQuery = "INSERT INTO users (username, password) VALUES (?, ?)"

  db.run(sqlQuery, [username, password], (err) => {

    if(err)
      callback(false)
    else
      callback(true)
  })
}

exports.usernameExists = function(username, callback) {

  let sqlQuery = "SELECT * FROM users WHERE username = ?"

  db.get(sqlQuery, [username], (err, row) => {

    if(err || !row)
      callback(false)
    else
      callback(true)
  })
}

exports.userExists = function(username, password, callback) {

  let sqlQuery = "SELECT * FROM users WHERE username = ? AND password = ?"

  db.get(sqlQuery, [username, password], (err, row) => {

    if(err || !row)
      callback(false)
    else
      callback(true)
  })
}