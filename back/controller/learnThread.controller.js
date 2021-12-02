const LearnThread = require("../models/learnThread.model");


let response = {
    msg:   "",
    exito: false
}


//Funcion para crear Learn Thread 
exports.create = function(req, res){
    let hilo = new LearnThread({
        nombre:                 req.body.nombre,
        descripcion:            req.body.descripcion,
        url:                    req.body.url,
        fecha_creacion:         req.body.fecha_creacion,
        fecha_actualizacion:    req.body.fecha_actualizacion,
    });


    hilo.save(function(err){
        if(err){
            console.log=false,
            response.exito = false,
            response.msg= "Error al guardar el Learn Thread",
            res.json(response)
            return;
        }
    });

    response.exito = true;
    response.msg= "El Learn Thread se guardo correctamente.";
    res.json(response);
    // res.status(200).json(response);
}


// Funcion para buscar todos Learn Thread 
exports.find= function(req, res){
    LearnThread.find(function(err, hilos){
        res.json(hilos)
    })
}


// Funcion para buscar solo uno  Learn Thread 
exports.findOne = function(req, res){
    LearnThread.findOne( {_id: req.params.id} ,function(err, hilo){
        res.json(hilo)
    })
}

// Funcion para actualizar solo uno  Learn Thread 
exports.update = function(req, res){
    
    let hilo= {
        nombre:                 req.body.nombre,
        descripcion:            req.body.descripcion,
        fecha_creacion:         req.body.fecha_creacion,
        fecha_actualizacion:    req.body.fecha_actualizacion,
    }


    LearnThread.findByIdAndUpdate(req.params.id, {$set: hilo}, function(err){
        if(err){
            cosole.log(err),
            response.exito = false,
            response.msg = "Error al cambiar datos del Learn Thread.",
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "Los datos del Learn Thread se han actualizado.",
        res.json(response)
    });
}

// Funcion para eliminar un Learn Thread  
exports.remove = function(req, res){
    LearnThread.findByIdAndRemove({_id: req.params.id}, function(err){

        if(err){
            console.error(err),
            response.exito = false,
            response.msg = "Error al remover los datos del Learn Thread.",
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "! Los datos del Learn Thread se han eliminado, para siempre¡",
        res.json(response)

    })
}