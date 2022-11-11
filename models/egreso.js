const {Schema, model } = require('mongoose');

const egresoSchema = Schema({

    fecha:{
        type: Date
    },

    descripcion:{
        type: String,
    },

    monto:{
        type: Number,
    },
    
});

module.exports = model('egresoModel', egresoSchema);