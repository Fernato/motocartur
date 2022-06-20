const {Schema, model } = require('mongoose');

const facturaSchema = Schema({

    fecha:{
        type: Date
    },

    descripcion:{
        type: String,
    },

    monto:{
        type: String,
    },
    
    idSocio:{
        type: Schema.ObjectId,
        ref: 'socioModel'
    }
    
});

module.exports = model('facturaModel', facturaSchema);