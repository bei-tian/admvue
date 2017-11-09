module.exports = {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'admvue'
    },
    pool: { min: 0, max: 7 },
    prefix: 'adm_',
    debug: true
}
