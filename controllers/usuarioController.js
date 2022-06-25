const {response} = require('express');

const usuarioModel = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async ( req, res = response ) => {

    const {body} = req
    console.log(body)


    try {

        const {usuario} = body;

        let user = await usuarioModel.findOne({usuario})

        if(user){
            return res.status(400).json({
                ok:false,
                msg: 'Ese usuario ya existe'
            })
        }

        
       user = await new usuarioModel(req.body)
       await user.save()
       
       //Generar JWT

       const token = await generarJWT ( user.id );

        res.status(201).json({
            ok: true,
            user,
            token
        })


        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }
}


const login = async ( req, res = response) => {

    try {        
        const {usuario, password} = req.body;

      
        const user = await usuarioModel.findOne({usuario})

        if(!user){

            return res.status(400).json({
                ok:false,
                msg: 'Ese usuario no existe'
            })

        }

        if(user.password === password){
            //Generar JWT

            const token = await generarJWT ( user.id );

            res.status(200).json({
                ok: true,
                uid: user.id,
                perfil: user.perfil,
                token
            })
        }else{
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña incorrecta'
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
        
    }
}

const revalidadToken = async(req, res = response) => {

    const uid = req.uid;

    //Generar JWT

    try {
        const token = await generarJWT ( uid );

        res.json({
            ok:true,
            uid,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

   

}
module.exports = {
    crearUsuario,
    login,
    revalidadToken

}