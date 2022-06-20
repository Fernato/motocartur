const {response} = require('express');

const socioModel = require('../models/socios');

const getSocios = async (req, res = response) => {

    try {
        
        const socios = await socioModel.find();
    
        res.status(200).json({
            ok: true,
            socios
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}
const getSocio = async ( req, res = response) => {

    try {        
        const {id} = req.params;

        const socio = await socioModel.findOne({id})

        if(!socio){

            return res.status(400).json({
                ok:false,
                msg: 'Ese socio no existe'
            })

        }
        res.status(200).json({
            ok: true,
            socio
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
        
    }
}

const crearSocio = async ( req, res = response ) => {

    const {body} = req


    try {

        const {cedula} = body;

        let socio = await socioModel.findOne({cedula})

        if(socio){
            return res.status(400).json({
                ok:false,
                msg: 'Ese socio ya existe'
            })
        }

        
       socio = await new socioModel(req.body)
       socio.save()
       

        res.status(201).json({
            ok: true,
            socio
        })


        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }
}

const eliminarSocio = async ( req, res = response) => {

    try {

        const {id} = req.params;

        let socio = await socioModel.findOne({id})

        if(!socio){
            return res.status(400).json({
                ok:false,
                msg: 'Ese socio no existe'
            })
        }

        await socioModel.deleteOne({id})
    
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

const actualizarSocio = async ( req, res = response) => {

    try {
        
        const {id} = req.params;

        let socio = await socioModel.findOne({id})

        if(!socio){
            return res.status(400).json({
                ok:false,
                msg: 'Ese socio no existe'
            })
        }

        await socioModel.updateOne({id}, req.body)
    
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
    getSocios,
    getSocio,
    crearSocio,
    actualizarSocio,
    eliminarSocio,

}