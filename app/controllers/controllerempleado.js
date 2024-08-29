const db = require('../config/db.config.js');
const Empleado = db.empleado;

exports.createEmpleado = async (req, res) => {
    try {
        const empleadoData = {
            primer_nombre: req.body.primer_nombre,
            segundo_nombre: req.body.segundo_nombre,
            primer_apellido: req.body.primer_apellido,
            segundo_apellido: req.body.segundo_apellido,
            nit: req.body.nit,
            salario: req.body.salario,
            estatus: req.body.estatus,
            id_departamento: req.body.id_departamento
        };

        const empleado = await Empleado.create(empleadoData);
        res.status(200).json({
            message: "Empleado creado exitosamente con id = " + empleado.id_empleado,
            empleado: empleado,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el empleado!",
            error: error.message
        });
    }
};

exports.getAllEmpleados = (req, res) => {
    Empleado.findAll()
        .then(empleadoInfo => {
            res.status(200).json({
                message: "Se obtuvieron todos los empleados exitosamente.",
                empleados: empleadoInfo
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los empleados!",
                error: error.message
            });
        });
};

exports.getEmpleadoById = (req, res) => {
    const idEmpleado = req.params.id;
    Empleado.findAll({
        where: { id_empleado: idEmpleado }
    })
        .then(empleadoInfo => {
            res.status(200).json({
                message: "Se obtuvieron todos los datos del empleado con id = " + idEmpleado,
                empleados: empleadoInfo
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los empleados!",
                error: error.message
            });
        });
};

exports.updateEmpleado = async (req, res) => {
    try {
        const empleadoId = req.params.id;
        const empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            return res.status(404).json({
                message: "No se encontró el empleado para actualizar con id = " + empleadoId,
                empleado: "",
                error: "404"
            });
        } else {
            const updatedObject = {
                primer_nombre: req.body.primer_nombre,
                segundo_nombre: req.body.segundo_nombre,
                primer_apellido: req.body.primer_apellido,
                segundo_apellido: req.body.segundo_apellido,
                nit: req.body.nit,
                salario: req.body.salario,
                estatus: req.body.estatus,
                id_departamento: req.body.id_departamento
            };
            const [updatedCount, [updatedEmpleado]] = await Empleado.update(updatedObject, {
                returning: true,
                where: { id_empleado: empleadoId }
            });

            if (updatedCount === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el empleado con id = " + empleadoId,
                    error: "No se pudo actualizar"
                });
            } else {
                res.status(200).json({
                    message: "Empleado actualizado exitosamente con id = " + empleadoId,
                    empleado: updatedEmpleado
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el empleado con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteEmpleado = async (req, res) => {
    try {
        const empleadoId = req.params.id;
        const empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            return res.status(404).json({
                message: "No existe un empleado con id = " + empleadoId,
                error: "404"
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Empleado eliminado exitosamente con id = " + empleadoId,
                empleado: empleado
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el empleado con id = " + req.params.id,
            error: error.message
        });
    }
};