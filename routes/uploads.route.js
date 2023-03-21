// ruta: api/uploads/:busqueda
const { Router }=require('express');
const { fileUpload, retornaImagen } = require('../controllers/uploads.controller');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router()


router.use(expressFileUpload());

router.put('/:tipo/:id',validarJWT,fileUpload);
router.get('/:tipo/:foto',retornaImagen);

module.exports=router;