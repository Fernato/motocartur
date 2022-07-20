const {response} = require('express');

const facturaModel = require('../models/factura');
const socioModel = require('../models/socios')


const getFacturas = async (req, res = response) => {

    try {
        
        const facturas = await facturaModel.find().populate(['socio']);

        facturas.sort((function (a, b) {
            if (a.fecha > b.fecha) {
            return 1;
            }
            if (a.fecha < b.fecha) {
            return -1;
            }
            return 0;
        }))
        
         
    
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
    console.log('esto es getFactura')
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
            factura
            
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
        
    }
}

const getFacturasSocio = async ( req, res = response) => {

    try {        
        const { id } = req.params;

        const facturas = await facturaModel.find({socio: id}).populate(['socio'])

        if( !facturas ){

            return res.status(400).json({
                ok:false,
                msg: 'Ese factura no existe'
            })

        }

        let total = 0

        for(let fac of facturas){
            total += fac.monto
        }

        const socio = await socioModel.findById(id)
        res.status(200).json({
            ok: true,
            facturas,
            socio,
            total
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


const getFacturasTotal = async (req, res = response) => {
    
    try {
        
        const facturas = await facturaModel.find();
        
        let total=0

        for ( let fac of facturas){
            total += fac.monto
        }
       

        res.status(200).json({
            ok: true,
            total,
         })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}

const getCuentasIndividualesSocios = async (req, res = response ) => {
    try {
        
        const socios = await socioModel.find();

        let listSoc=[]

        for (let soc of socios){
            let socio={id:'', cedula: '', nombre: '', monto:0}
            let facturas = await facturaModel.find({socio:{$all:[soc._id]}})
            socio.id = soc.id
            socio.cedula = soc.cedula
            socio.nombre = soc.nombre

            let suma = 0
            for(fac of facturas){
                suma += fac.monto
            }

            socio.monto=suma
           
            listSoc.push(socio)
        }

        let total = 0

        for (let soc of listSoc){
            total += soc.monto
        }

        listSoc.sort((function (a, b) {
            if (a.nombre > b.nombre) {
            return 1;
            }
            if (a.nombre < b.nombre) {
            return -1;
            }
            return 0;
        }))

        res.status(200).json({
            ok: true,
            listSoc,
            total
        })

    } catch (error) {

        console.log(error)
        
    }
}

module.exports = {
    getFacturas,
    getFactura,
    crearFactura,
    actualizarFactura,
    eliminarFactura,
    getFacturasTotal,
    getCuentasIndividualesSocios,
    getFacturasSocio

}