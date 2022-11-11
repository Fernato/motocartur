const {response} = require('express');


const egresoFerneyModel = require('../models/egresoFerney')

const getEgresosFerney = async (req, res = response) => {

    try {
        
        const egresos = await egresoFerneyModel.find();

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

const crearEgresoFerney = async ( req, res = response ) => {

    const {body} = req


    try {

        const { descripcion, fecha, monto } = body;

      
        egreso = await new egresoFerneyModel({
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

const eliminarEgresoFerney = async ( req, res = response) => {

    try {

        const { id } = req.params;

        let egreso = await egresoFerneyModel.findOne({ _id : id })

        if( !egreso ){
            return res.status(400).json({
                ok:false,
                msg: 'Ese egreso no existe'
            })
        }

        await egresoFerneyModel.deleteOne({_id: id})
    
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

const actualizarEgresoFerney = async ( req, res = response) => {

    try {
        
        const { id } = req.params;

        let egreso = await egresoFerneyModel.findOne({ _id: id  })

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

        await egresoFerneyModel.updateOne({ _id: id  }, cuerpo)
    
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
    crearEgresoFerney,
    getEgresosFerney,
    actualizarEgresoFerney,
    eliminarEgresoFerney

}