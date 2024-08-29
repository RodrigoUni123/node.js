let express = require('express');
let router = express.Router();

const controllerdepartamento = require('../controllers/controllerdepartamento.js');
const controllerempleado = require('../controllers/controllerempleado.js');

// Rutas de controlador departamento
router.post('/api/departamentos/create', controllerdepartamento.createDepartamentos);
router.get('/api/departamentos/all', controllerdepartamento.getAllDepartamentos);
router.get('/api/departamentos/descripcion/:descripcion', controllerdepartamento.getDepartamentoByDescripcion);
router.put('/api/departamentos/update/:id', controllerdepartamento.updateDepartamento);
router.delete('/api/departamentos/delete/:id', controllerdepartamento.deleteDepartamento);

// Rutas de controlador empleados
router.post('/api/empleados/create', controllerempleado.Createempleados);
router.get('/api/empleados/all', controllerempleado.getAllempleados);
router.get('/api/empleados/libro/:id', controllerempleado.getempleadosbyDescripcion);
router.put('/api/empleados/update/:id', controllerempleado.updateempleados);
router.delete('/api/empleados/delete/:id', controllerempleado.deleteempleados);

module.exports = router;