const {response} = require('express');


const egresoModel = require('../models/egreso')

const getEgresos = async (req, res = response) => {

    try {
        
        const egresos = await egresoModel.find();

        egresos.sort((function (a, b) {
            if (a.fecha > b.fecha) {
            return 1;
            }
            if (a.fecha < b.fecha) {
            return -1;
            }
            return 0;
        }))

        suma = 0

        for (egr of egresos){
            suma += egr.monto
        }

        res.status(200).json({
            ok: true,
            egresos,
            suma
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}

const crearEgreso = async ( req, res = response ) => {

    const {body} = req


    try {

        const { descripcion, fecha, monto } = body;

      
        egreso = await new egresoModel({
            fecha: fecha,
            descripcion: descripcion,
            monto: monto
        } )

        egreso.save()
       
        res.status(201).json({
            ok: true,
            egreso
        })


        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }
}

const eliminarEgreso = async ( req, res = response) => {

    try {

        const { id } = req.params;

        let egreso = await egresoModel.findOne({ _id : id })

        if( !egreso ){
            return res.status(400).json({
                ok:false,
                msg: 'Ese egreso no existe'
            })
        }

        await egresoModel.deleteOne({_id: id})
    
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

const actualizarEgreso = async ( req, res = response) => {

    try {
        
        const { id } = req.params;

        let egreso = await egresoModel.findOne({ _id: id  })

        if(!egreso){
            return res.status(400).json({
                ok:false,
                msg: 'Ese Egreso no existe'
            })
        }
        cuerpo = {
            descripcion: req.body.descripcion,
            monto: req.body.monto
        }

        await egresoModel.updateOne({ _id: id  }, cuerpo)
    
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
    crearEgreso,
    getEgresos,
    actualizarEgreso,
    eliminarEgreso

}