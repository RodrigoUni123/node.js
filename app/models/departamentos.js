// models/departamentos.js
module.exports = (sequelize, Sequelize) => {
    const departamento = sequelize.define('departamentos', { // Nombre de la tabla en la base de datos
        id_departamento: {
            type: Sequelize.NUMERIC,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING(80),
            allowNull: false
        },
    });

    return departamento;
};