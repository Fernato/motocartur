const {Schema, model } = require('mongoose');

const ingresoFerneySchema = Schema({

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

module.exports = model('ingresoFerneyModel', ingresoFerneySchema);