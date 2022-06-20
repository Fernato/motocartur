const {response} = require('express');

const facturaModel = require('../models/factura');

const getFacturas = async (req, res = response) => {

    try {
        
        const factura = await facturaModel.find();
    
        res.status(200).json({
            ok: true,
            factura
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

        const { _id, idSocio } = body;

        let factura = await facturaModel.findOne({ _id })

        if( factura ){
            return res.status(400).json({
                ok:false,
                msg: 'Ese socio ya existe'
            })
        }

        
        factura = await new facturaModel(  req.body )
        factura.idSocio = idSocio
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