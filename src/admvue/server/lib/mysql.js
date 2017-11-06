const mysql = require('mysql')
const config = require('../../../config/db')
let prefix = config.mysql.prefix
let pool = null
pool = mysql.createPool(config.mysql)

let db = {}
db.prefix = prefix

db.query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        console.log(err.sql)
                        console.log(err.sqlMessage)
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
    
}


db.add = function (table, data) {
    let keys = []
    let replace = []
    let values = []
    for (let key in data) {
        keys.push(key)
        replace.push('?')
        values.push(data[key])
    }
    let sql = "INSERT INTO `" + prefix + table + "` (" + keys.join(',') + ") VALUES (" + replace.join(',') + ")"
    return this.query(sql, values)
}


db.save = function (table, data, condition) {
    let set = ''
    let values = []
    for (let key in data) {
        set = set + key + ' = ?,'
        values.push(data[key])
    }
    set = set.substring(0, set.length - 1)
    let sql = "UPDATE `" + prefix + table + "` SET " + set + " WHERE " + condition
    return this.query(sql, values)
}


db.delete = function (table, condition) {
    let sql = "DELETE FROM `" + prefix + table + "`  WHERE " + condition
    return this.query(sql)
}

global.db = db