const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LearnThreadSchema = new Schema({
    nombre:                 {type: String, required: true,  max:60},
    descripcion:            {type: String, required: true,  max:1000},
    url:                    {type: String, required: true,  max:1000},
    fecha_creacion:         {type: Date, required: true},
    fecha_actualizacion:    {type: Date, required: true},
});

module.exports = mongoose.model("learnThread", LearnThreadSchema);