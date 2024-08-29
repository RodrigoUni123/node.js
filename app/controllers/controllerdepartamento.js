const db = require('../config/db.config.js');
const Departamento = db.departamento;

exports.createDepartamento = (req, res) => {
    const departamento = {
        descripcion: req.body.descripcion,
    };

    Departamento.create(departamento)
        .then(result => {
            res.status(200).json({
                message: "Departamento creado exitosamente con id = " + result.id_departamento,
                departamento: result,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al crear el departamento!",
                error: error.message
            });
        });
};

exports.getAllDepartamentos = (req, res) => {
    Departamento.findAll()
        .then(departamentoInfos => {
            res.status(200).json({
                message: "Se obtuvieron todos los departamentos exitosamente.",
                departamentos: departamentoInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los departamentos!",
                error: error.message
            });
        });
};

exports.getDepartamentoByDescripcion = (req, res) => {
    const descripcion = req.params.descripcion;
    Departamento.findAll({ where: { descripcion: descripcion } })
        .then(departamentos => {
            res.status(200).json({
                message: "Departamentos obtenidos exitosamente con la descripción = " + descripcion,
                departamentos: departamentos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los departamentos!",
                error: error.message
            });
        });
};

exports.updateDepartamento = async (req, res) => {
    try {
        const departamentoId = req.params.id;
        const departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "No se encontró el departamento para actualizar con id = " + departamentoId,
                departamento: "",
                error: "404"
            });
        } else {
            const updatedObject = {
                descripcion: req.body.descripcion,
            };
            const [updatedCount, [updatedDepartamento]] = await Departamento.update(updatedObject, {
                returning: true,
                where: { id_departamento: departamentoId }
            });

            if (updatedCount === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el departamento con id = " + departamentoId,
                    error: "No se pudo actualizar"
                });
            } else {
                res.status(200).json({
                    message: "Departamento actualizado exitosamente con id = " + departamentoId,
                    departamento: updatedDepartamento
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el departamento con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteDepartamento = async (req, res) => {
    try {
        const departamentoId = req.params.id;
        const departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "No existe un departamento con id = " + departamentoId,
                error: "404"
            });
        } else {
            await departamento.destroy();
            res.status(200).json({
                message: "Departamento eliminado exitosamente con id = " + departamentoId,
                departamento: departamento
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el departamento con id = " + req.params.id,
            error: error.message
        });
    }
};