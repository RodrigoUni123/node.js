// models/Libros.js
module.exports = (sequelize, Sequelize) => {
    const empleado = sequelize.define('empleados', { // Nombre de la tabla en la base de datos
        id_empleado: {
            type: Sequelize.NUMERIC,
            autoIncrement: true,
            primaryKey: true
        },
        primer_nombre: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        segundo_nombre: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        primer_apellido: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        segundo_apellido: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        nit: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        salario: {
            type: Sequelize.NUMERIC
        },
        estatus: {
            type: Sequelize.NUMERIC
        },
        id_departamento: {
            type: Sequelize.NUMERIC,
            autoIncrement: true,
            primaryKey: true
        }
    });

    return empleado;
};
