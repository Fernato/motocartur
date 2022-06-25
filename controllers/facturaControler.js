const {response} = require('express');

const facturaModel = require('../models/factura');
const socioModel = require('../models/socios')


const getFacturas = async (req, res = response) => {

    try {
        
        const facturas = await facturaModel.find().populate(['socio']);

        
         
    
        res.status(200).json({
            ok: true,
            facturas
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}
const getFactura = async ( req, res = response) => {

    try {        
        const { id } = req.params;

        const factura = await facturaModel.findOne({id})

        if( !factura ){

            return res.status(400).json({
                ok:false,
                msg: 'Ese factura no existe'
            })

        }
        res.status(200).json({
            ok: true,
            socio: factura
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
        
    }
}

const crearFactura = async ( req, res = response ) => {

    const {body} = req


    try {


        const { cedula, descripcion, fecha, monto } = body;

        const socio = await socioModel.findOne({cedula: cedula})

        if(!socio){
            return res.status(400).json({
                ok:false,
                msg: 'Ese socio no existe'
            })
        }
      
        factura = await new facturaModel({
            fecha: fecha,
            descripcion: descripcion,
            monto: monto
        } )
        factura.socio = socio._id
        factura.save()
       

        res.status(201).json({
            ok: true,
            socio: factura
        })


        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }
}

const eliminarFactura = async ( req, res = response) => {

    try {

        const { id } = req.params;

        let factura = await facturaModel.findOne({ id })

        if( !factura ){
            return res.status(400).json({
                ok:false,
                msg: 'Ese factura no existe'
            })
        }

        await facturaModel.deleteOne({id})
    
        res.status(200).json({
            ok: true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}

const actualizarFactura = async ( req, res = response) => {

    try {
        
        const { id } = req.params;

        let factura = await facturaModel.findOne({ id })

        if(!factura){
            return res.status(400).json({
                ok:false,
                msg: 'Ese factura no existe'
            })
        }

        await facturaModel.updateOne({ id }, req.body)
    
        res.status(200).json({
            ok: true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}

module.exports = {
    getFacturas,
    getFactura,
    crearFactura,
    actualizarFactura,
    eliminarFactura,

}