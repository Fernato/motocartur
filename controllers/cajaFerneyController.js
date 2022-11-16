const {response} = require('express');


const egresoModel = require('../models/egresoFerney')
const ingresoModel = require('../models/ingresoFerney');


const sumaEgresos = async () => {

    try {

        let totalEgresos = {
            nequi:0,
            bancolombia:0,
            efectivo:0,
            total:0,
        }
        
        let sumanequi = 0
        const egresosNequi = await egresoModel.find({fuente:{$all:['NEQUI']}}); 
        egresosNequi.map(en=>{
            sumanequi += en.monto
        })

        let sumaefectivo = 0
        const egresosEfectivo = await egresoModel.find({fuente:{$all:['EFECTIVO']}}); 
        egresosEfectivo.map(en=>{
            sumaefectivo += en.monto
        })

        let sumaban = 0
        const egresosBanc = await egresoModel.find({fuente:{$all:['BANCOLOMBIA']}}); 
        egresosBanc.map(en=>{
            sumaban += en.monto
        })

       
  

        totalEgresos.nequi = sumanequi
        totalEgresos.bancolombia = sumaban
        totalEgresos.efectivo = sumaefectivo
        totalEgresos.total = sumanequi + sumaban + sumaefectivo

        return totalEgresos
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}

const sumaIngresos = async () => {

    try {
        
       let totalIngresos = {
            nequi:0,
            bancolombia:0,
            efectivo:0,
            total:0
        }
        
        let sumanequi = 0
        const egresosNequi = await ingresoModel.find({fuente:{$all:['NEQUI']}}); 
        egresosNequi.map(en=>{
            sumanequi += en.monto
        })

        let sumaefectivo = 0
        const egresosEfectivo = await ingresoModel.find({fuente:{$all:['EFECTIVO']}}); 
        egresosEfectivo.map(en=>{
            sumaefectivo += en.monto
        })

        let sumaban = 0
        const egresosBanc = await ingresoModel.find({fuente:{$all:['BANCOLOMBIA']}}); 
        egresosBanc.map(en=>{
            sumaban += en.monto
        })

        totalIngresos.nequi = sumanequi
        totalIngresos.bancolombia = sumaban
        totalIngresos.efectivo = sumaefectivo
        totalIngresos.total = sumanequi + sumaban + sumaefectivo

        return totalIngresos

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

        const total = sumIngresos.total - sumEgresos.total

        const nequi = sumIngresos.nequi - sumEgresos.nequi
        const efectivo = sumIngresos.efectivo - sumEgresos.efectivo
        const bancolombia = sumIngresos.bancolombia - sumEgresos.bancolombia

        const caja ={
            nequi,
            bancolombia, 
            efectivo,
            total
        }

        res.status(200).json({
            ok: true,
            sumIngresos,
            sumEgresos,
            caja,
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