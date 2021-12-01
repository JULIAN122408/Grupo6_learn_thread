const mongoose  = require("mongoose");
const Schema= mongoose.Schema;

const UsuariosSchema = new Schema({
    usuario:                {type: String, required: true,  max:100},
    pass:                   {type: String, required: true,  max:128}, //SIEMPRE debe ser 128 por la encriptacion.
    correo:                 {type: String, required: true,  max:100},
    fecha_nacimiento:       {type: String, required: true,  max:50},
});

module.exports= mongoose.model("usuarios", UsuariosSchema);