const {response}=require('express')
const Medico = require('../models/medico.model')

const getMedicos = async (req,res=response)=>{

    try {
      const medicos = await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')
    res.json({
        ok:true,
        medicos
    })  
    } catch (error) {
        res.status(500).json(
            {
                ok:false,
                msg:'Comuniquese con el admin'
            }
        )
    }
    
}
const crearMedico = async(req,res=response)=>{

    const uid = req.uid;
    const medico = new Medico({
        usuario:uid,
        ...req.body

    })

    try {

        const medicoDB=await medico.save()



        res.json({
            ok:true,
            medico:medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok:false,
                msg:'Comuniquese con el admin'
            }
        )
    }

   
}
const actualizarMedico =async (req,res=response)=>{

    const medicoID=req.params.id;
    const uid = req.uid
    try {

        const medicoDB = await Medico.findById(medicoID) 
        if(!medicoDB){
            return res.status(404).json(
                {
                    ok:false,
                    msg:'Médico no encontrado'
                }
            )
        }

        // medicoDB.nombre = req.body.nombre;

        const cambiosMedico = {
            ...req.body,
            usuario:uid
        }

        const medicoActualizado= await Medico.findByIdAndUpdate(medicoID,cambiosMedico,{new:true})




        res.json({
            ok:true,
            medico:medicoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error, comuniquese con su admin'
        })
    }
   
    
}
const borrarMedico = async (req,res=response)=>{

    const medicoID=req.params.id;
    
    try {

        const medicoDB = await Medico.findById(medicoID) 
        if(!medicoDB){
            return res.status(404).json(
                {
                    ok:false,
                    msg:'Médico no encontrado'
                }
            )
        }

        

         await Medico.findByIdAndDelete(medicoID)




        res.json({
            ok:true,
            msg:'Médico eliminado'
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
    getMedicos,
    crearMedico,
    borrarMedico,
    actualizarMedico
}