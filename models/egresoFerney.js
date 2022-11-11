const {Schema, model } = require('mongoose');

const egresoFerneySchema = Schema({

    fecha:{
        type: Date
    },

    descripcion:{
        type: String,
    },

    monto:{
        type: Number,
    },
    fuente:{
        type: String,
    },
    
});

module.exports = model('egresoFerneyModel', egresoFerneySchema);