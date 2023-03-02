const Usuario = require('../models/usuario.model')
const { response } = require('express')

const getUsuarios=async(req,res)=>{

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok:true,
        usuarios
    })
}


const crearusuario= async (req,res=response)=>{

    const {nombre,password,email}=req.body;

    //si el usuario existe
    try {

        const existeEmail=await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body)
        await usuario.save();
        
        res.json({
            ok:true,
            usuario     
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            mgs:'Error inesperado.. revisar log'
        })
        
    }


   
}

module.exports={
    getUsuarios,
    crearusuario
}