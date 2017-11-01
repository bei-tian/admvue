// var sqlite3 = require('sqlite3')
// var path = require('path')
// var db = new sqlite3.Database(path.resolve(__dirname, './data.db3'));
//
// db.serialize(function() {
//
//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//     console.log(row.id + ": " + row.info);
//   });
// });
//
// db.close();

var sqlite3 = require('sqlite3')
var path = require('path')
var sqlite = new sqlite3.Database(path.resolve(__dirname, './data.db3'));

const config = require('../../../config/db')
let prefix = config.sqlite.prefix

let db = {}
db.prefix = prefix

db.query = function( sql, params ,mode) {
    mode = mode || 'all';
    return new Promise(( resolve, reject ) => {
        sqlite[mode](sql, params, function(err, rows) {
            if (err) {
                console.log(err)
                reject( err )
            } else {
                resolve(rows)
            }
        })
    })
}


db.add = function (table, data) {
    let keys = []
    let replace = []
    let values = []
    for(let key in data) {
        keys.push(key)
        replace.push('?')
        values.push(data[key])
    }
    let sql = "INSERT INTO `"+ prefix + table + "` ("+ keys.join(',') +") VALUES ("+ replace.join(',') +")"
    return this.query(sql, values, 'run')
}


db.save = function (table, data, condition) {
    let set = ''
    let values = []
    for(let key in data) {
        set = set + key +' = ?,'
        values.push(data[key])
    }
    set = set.substring(0,set.length-1)
    let sql = "UPDATE `"+ prefix + table + "` SET "+ set +" WHERE "+ condition
    return this.query(sql, values, 'run')
}


db.delete = function (table, condition) {
    let sql = "DELETE FROM `"+ prefix + table + "`  WHERE "+ condition
    return this.query(sql, [], 'run')
}

global.db = db