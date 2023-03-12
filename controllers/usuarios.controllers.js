const Usuario = require('../models/usuario.model')
const { response } = require('express')
// const { validationResult }=require('express-validator')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');



const getUsuarios=async(req,res)=>{

    const desde= Number(req.query.desde) || 0
       
    
    const [usuarios, total]=await Promise.all([
    Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit(5),

            Usuario.countDocuments() 
    ])

    res.json({
        ok:true,
        usuarios,
        //se añadio en el middleware de jwt al ser correcto
        uid:req.uid,
        total
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

        //encriptar constraseña
        const salt = bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password, salt)

        //guardar Usuario
        await usuario.save();


        const token= await generarJWT(usuario.id)

        
        res.json({
            ok:true,
            usuario,
            token    
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            mgs:'Error inesperado.. revisar log'
        })
        
    }


   
}

const actualizarUsuario= async(req, res =response)=>{

    //TODO: validar token y comprobar si el suuario es correcto
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid)

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'El usuario no existe'
            })
        }

        const {password, google, email,...campos} = req.body;

        if(usuarioDB.email !== email){
        
            const existeEmail = await Usuario.findOne({
                email
            })
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'ya existe un usuario con ese Email'
                })
            }
        }

        campos.email=email

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true})


        res.json({
            ok:true,
            usuario:usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            mgs:'Error inesperado.. revisar log'
        })
    }
}

const borrarUsuario = async(req,res=response)=>{
    const uid = req.params.id;
    try {
        
        const usuarioDB = await Usuario.findById(uid)

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'El usuario no existe'
            })
        }

        await Usuario.findByIdAndDelete(uid)

        res.status(200).json(
            {
                ok:true,
                msg:'Usuario eliminadoace'
            }
        )
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
    crearusuario,
    actualizarUsuario,
    borrarUsuario
}