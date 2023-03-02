// Ruta: api/usuarios
const { Router }=require('express')
const { getUsuarios, crearusuario}=require('../controllers/usuarios.controllers')

const router = Router()

router.get('/',getUsuarios)
router.post('/',crearusuario)






module.exports=router