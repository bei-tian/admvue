const config = require('../../../config/config')
const md5 = require('../utils/md5')


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('admin', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            set(val) {
                this.setDataValue('password', md5(md5(val) + config.md5Hash));
            }
        },
        login_time: DataTypes.DATE,
        create_time: DataTypes.DATE
    }, {
        timestamps: false,
        tableName: 'adm_admin',
    })
}