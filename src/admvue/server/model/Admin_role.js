
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('admin_role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        privilege: DataTypes.STRING,
        create_time: DataTypes.DATE
    }, {
        timestamps: false,
        tableName: 'adm_admin_role',
    })
}