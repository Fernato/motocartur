const {response} = require('express');


const ingresoFerneyModel = require('../models/ingresoFerney')



const crearIngresoFerney = async ( req, res = response ) => {

    const {body} = req


    try {

        const { descripcion, fecha, monto } = body;

      
        ingreso = await new ingresoFerneyModel({
            fecha: fecha,
            descripcion: descripcion,
            monto: monto
        } )

        ingreso.save()
       
        res.status(201).json({
            ok: true,
            ingreso
        })


        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }
}

const getIngresosFerney = async (req, res = response) => {

    try {
        
        const ingresos = await ingresoFerneyModel.find();

        ingresos.sort((function (a, b) {
            if (a.fecha > b.fecha) {
            return 1;
            }
            if (a.fecha < b.fecha) {
            return -1;
            }
            return 0;
        }))

        suma = 0

        for (ing of ingresos){
            suma += ing.monto
        }

        res.status(200).json({
            ok: true,
            ingresos,
            suma
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}


const eliminarIngresoFerney = async ( req, res = response) => {

    try {

        const { id } = req.params;

        let ingreso = await ingresoFerneyModel.findOne({ _id : id })

        if( !ingreso ){
            return res.status(400).json({
                ok:false,
                msg: 'Ese ingreso no existe'
            })
        }

        await ingresoFerneyModel.deleteOne({_id: id})
    
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

const actualizarIngresoFerney = async ( req, res = response) => {

    try {
        
        const { id } = req.params;

        let ingreso = await ingresoFerneyModel.findOne({ _id: id  })

        if(!ingreso){
            return res.status(400).json({
                ok:false,
                msg: 'Ese Ingreso no existe'
            })
        }
        cuerpo = {
            descripcion: req.body.descripcion,
            monto: req.body.monto
        }

        await ingresoFerneyModel.updateOne({ _id: id  }, cuerpo)
    
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
    crearIngresoFerney,
    getIngresosFerney,
    eliminarIngresoFerney,
    actualizarIngresoFerney
}