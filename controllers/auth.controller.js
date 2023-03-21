const { response } = require("express");
const Usuario = require('../models/usuario.model')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helper/jwt");
const { googleVerify } = require("../helper/google-verify");

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

const googleSignIn = async (req,res=response)=>{


    try {
        const {email, name, picture} =await googleVerify(req.body.token)


        const usuarioDB= await Usuario.findOne({email});
        let usuario;
        if(!usuarioDB){
            usuario = new Usuario({
                nombre:name,
                email,
                password:'@@@',
                img:picture,
                google:true
            })
        }else{
            usuario =usuarioDB
            usuario.google=true
            // usuario.password='@@'
        }

        //Guardar Usuario
        await usuario.save();

         //generar token - jwt

       const token= await generarJWT(usuario.id)

        res.json(
            {
                ok:true,
                email, name, picture,
                token
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok:false,
                msg:'Token de google no es correcto'
            }
        ) 
    }
}


const renewToken=async (req, res=response)=>{

    try {
        const uid=req.uid
        //generar nuevo token - jwt
       const token= await generarJWT(uid)

       //obtener usuario
        const usuario = await Usuario.findById(uid)


       res.json({
        ok:true,
        token,
        usuario
       })
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok:false,
                msg :'Error'
            }
        )  
    }
}
module.exports={
    login,
    googleSignIn,
    renewToken

}