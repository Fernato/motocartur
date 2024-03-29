const {response} = require('express');


const egresoModel = require('../models/egreso')
const facturaModel = require('../models/factura');


const sumaEgresos = async () => {

    try {
        
        const egresos = await egresoModel.find();

        suma = 0

        for (egr of egresos){
            suma += egr.monto
        }

        return suma
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}

const sumaIngresos = async () => {

    try {
        
        const facturas = await facturaModel.find();
        
        suma = 0
        for (let fac of facturas){
            suma += fac.monto
        }
        return suma

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}


const getCaja = async (req, res = response) => {

    try {
        
        const sumIngresos = await sumaIngresos()
        const sumEgresos = await sumaEgresos()

        const totalCaja = sumIngresos - sumEgresos

        res.status(200).json({
            ok: true,
            sumIngresos,
            sumEgresos,
            totalCaja
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}


module.exports = {
    getCaja
}