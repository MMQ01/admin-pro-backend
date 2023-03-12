const { response } = require('express')

const Usuario = require('../models/usuario.model')
const Medicos = require('../models/medico.model')
const Hospitales = require('../models/hospital.model')


const getTodo=async(req,res=response)=>{

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i')    

    const [usuarios,medicos, hospitales] = await Promise.all([
          Usuario.find({nombre: regex}),
          Medicos.find({nombre: regex}),
          Hospitales.find({nombre: regex}),
    ])

    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
       })
}

const getDocumentosColeccion=async(req,res=response)=>{

    const busqueda = req.params.busqueda;
    const tabla  = req.params.tabla;
    const regex = new RegExp(busqueda, 'i')    

    let data=[]

    switch (tabla) {
        case 'medicos':
            data=await Medicos.find({nombre: regex})
                .populate('usuario','nombre img')
                .populate('hospital','nombre img')
            break;
        case 'hospitales':
            data=await Hospitales.find({nombre: regex})
                .populate('usuario','nombre img')
            break;
        case 'usuarios':
             data=await Usuario.find({nombre: regex})
            
            break;
    
        default:
           return res.status(400).json(
                {
                    ok:false,
                    msg:'La tabla tiene que ser medicos/hospitales/usuarios'
                }
            )
            
    }

    res.json({
        ok:true,
        resultados:data,
    })
}

module.exports={
    getTodo,
    getDocumentosColeccion
}