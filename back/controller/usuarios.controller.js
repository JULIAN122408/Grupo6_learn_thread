const Usuario=require("../models/usuarios.model");
const crypto = require ("crypto")
const jwt =require("jsonwebtoken")


let response = {
    msg:   "",
    exito: false
}



exports.login = function(req, res, next){

    let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex");

    Usuario.findOne({ usuario: req.body.usuario, pass: hashedpass}, function(err, usuario ){
        let response = {
            token:null
        }
        if(usuario != null){
            response.token = jwt.sign({
                id: usuario._id,
                usuario: usuario.usuario
            }, "__recret__",
            // {expireIn:'12h'}
            );

        }
        res.json(response);
    })

}



//Funcion para crear un usuario
exports.create = function(req, res){

    //Se convierte el password del formulario a sha512.
    let hasheadpass = crypto.createHash("sha512").update(req.body.pass).digest("hex");

    let usuario = new Usuario({
        usuario:            req.body.usuario,
        correo:             req.body.correo,
        pass:               hasheadpass,
        fecha_nacimiento:   req.body.fecha_nacimiento,
    });

    usuario.save(function(err){
        if(err){
            console.log=false,
            response.exito = false,
            response.msg= "Error al guardar su información",
            res.json(response)
            return;
        }

    });

    response.exito = true;
    response.msg= "Se ha creado su usuario.";
    res.json(response);
    // res.status(200).json(empleado);
}

// Funcion para buscar todos los usuarios
exports.find= function(req, res){
    Usuario.find(function(err, usuarios){
        res.json(usuarios)
    })
}


// Funcion para buscar solo un usuario
exports.findOne = function(req, res){
    Usuario.findOne( {_id: req.params.id} ,function(err, usuario){
        res.json(usuario)
    })
}

// Funcion para actualizar solo un usuario 
exports.update = function(req, res){
    
    let Usuario= {
        nombre:     req.body.nomb,
        apellido_p: req.body.apellido_a,
        apellido_m: req.body.apellido_m,
        telefono:   req.body.telefono,
        email:      req.body.email,
        direccion:  req.body.direccion
    }

    Empleado.findByIdAndUpdate(req.params.id, {$set: empleado}, function(err){
        if(err){
            cosole.log(err),
            response.exito = false,
            response.msg = "Error al cambiar datos del empleado",
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "Los datos del empleado se han actualizado",
        res.json(response)
    });
}

// Funcion para eliminar un usuario 
exports.remove = function(req, res){
    Empleado.findByIdAndRemove({_id: req.params.id}, function(err){

        if(err){
            console.error(err),
            response.exito = false,
            response.msg = "Error al remover los datos del empleado.",
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "Los datos del empleado se han removido",
        res.json(response)

    })
}