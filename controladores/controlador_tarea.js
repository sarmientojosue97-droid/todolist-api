const Tarea = require('../modelos/tarea');

exports.obtener_tareas = async (req, res) => {
    const todas_las_tareas = await Tarea.find().sort({fecha_creacion: -1});
    res.json(todas_las_tareas);
};

exports.obtener_tarea = async (req, res) => {
    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
        return res.status(404).json({error: 'tarea no encontrada'});
    }

    res.json(tarea);
};

exports.crear_tarea = async (req, res) => {
    const tarea_nueva = new Tarea({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion
    });

    const tarea_guardada = await tarea_nueva.save();
    res.status(201).json(tarea_guardada);
};

exports.actualizar_tarea = async (req, res) => {
    const tarea_actualizada = await Tarea.findByIdAndUpdate(
        req.params.id,
        {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            completada: req.body.completada
        },
        {new: true}
    );

    if(!tarea_actualizada){
        return res.status(404).json({error: 'tarea no encontrada'});
    }

    res.json(tarea_actualizada);
};


exports.eliminar_tarea = async (req, res) => {
    const tarea_eliminada = await Tarea.findByIdAndDelete(req.params.id);

    if(!tarea_eliminada){
        return res.status(404).json({error: 'tarea no encontrada'});
    }

    res.json({mensaje: `tarea eliminada correctamente, id: ${req.params.id}`});
};