const {Schema, model } = require('mongoose');

const socioSchema = Schema({

    cedula:{
        type: String,
        require: true,
        unique: true
    },

    nombre:{
        type: String,
    },

    apellidos:{
        type: String,
    },

    celular:{
        type: String,
    },
    
    placa:{
        type: String,
    }
    
});

module.exports = model('socioModel', socioSchema);