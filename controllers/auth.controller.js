const { response } = require("express");
const Usuario = require('../models/usuario.model')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helper/jwt");

const login = async (req,res=response)=>{

    const { email, password }=req.body;

    try {

        const usuarioDB=await Usuario.findOne({email});

        // Verficar email
        if(!usuarioDB){
            return res.status(404).json(
                {
                    ok:false,
                    msg:'Email o constraseña invalida'
                }
            )
        }

        //verificar constraseña

        const validPassword = bcrypt.compareSync( password, usuarioDB.password)

        if(!validPassword){
            return res.status(400).json(
                {
                    ok:false,
                    msg:'Error en ingresar la contraseña'
                }
            )
        }

        //generar token - jwt

       const token= await generarJWT(usuarioDB.id)

        res.status(200).json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok:false,
                msg:'Hable con el admin'
            }
        )
    }
}

module.exports={
    login
}