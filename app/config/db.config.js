// config/db.config.js
const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: env.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar los modelos
db.departamento = require('../models/departamentos.js')(sequelize, Sequelize);
db.empleado = require('../models/empleados.js')(sequelize, Sequelize);

module.exports = db;
