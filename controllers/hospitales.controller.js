const {response}=require('express')
const Hospital = require('../models/hospital.model')

const getHospitales = async(req,res=response)=>{

    const hospitales = await Hospital.find()
                                        .populate('usuario','nombre img')

    res.json({
        ok:true,
        hospitales
    })
}
const crearHospital = async(req,res=response)=>{

    const uid = req.uid;
    const hospital = new Hospital(
        {
            usuario:uid,
            ...req.body

        }
        );

    try {

        const hospitalDB=await hospital.save();
        
        res.json({
            ok:true,
            hospital:hospitalDB
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }


}
const actualizarHospital = async(req,res=response)=>{

    const hospitalID=req.params.id;
    const uid = req.uid
    try {

        const hospitalDB = await Hospital.findById(hospitalID) 
        if(!hospitalDB){
            return res.status(404).json(
                {
                    ok:false,
                    msg:'Hospital no encontrado'
                }
            )
        }

        // hospitalDB.nombre = req.body.nombre;

        const cambiosHospital = {
            ...req.body,
            usuario:uid
        }

        const hospitalActualizado= await Hospital.findByIdAndUpdate(hospitalID,cambiosHospital,{new:true})




        res.json({
            ok:true,
            hospital:hospitalActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error, comuniquese con su admin'
        })
    }
   
}
const borrarHospital = async(req,res=response)=>{

    const hospitalID=req.params.id;
    
    try {

        const hospitalDB = await Hospital.findById(hospitalID) 
        if(!hospitalDB){
            return res.status(404).json(
                {
                    ok:false,
                    msg:'Hospital no encontrado'
                }
            )
        }

        // hospitalDB.nombre = req.body.nombre;

       await Hospital.findByIdAndDelete(hospitalID)

        // const hospitalActualizado= await Hospital.findByIdAndUpdate(hospitalID,cambiosHospital,{new:true})




        res.json({
            ok:true,
            msg:'Hospital eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error, comuniquese con su admin'
        })
    }
}

module.exports={
    getHospitales,
    crearHospital,
    borrarHospital,
    actualizarHospital
}