const MongoClient = require('mongodb').MongoClient
const defer = require('lodash/defer')
let db

function init (url, cb) {
  const mongoUrl = `${url}?authMechanism=SCRAM-SHA-1`
  if (!db) {
    MongoClient.connect(mongoUrl, (err, database) => {
      if (!err) db = database
      cb(err, db)
    })
  } else {
    defer(() => cb(null, db))
  }
}

function getDb () {
  return db
}

module.exports = {init, getDb}
