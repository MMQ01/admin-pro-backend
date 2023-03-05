
// path 'api/llogin'

const { Router }= require('express');
const { check } = require('express-validator');
const { login}=require('../controllers/auth.controller');
const { validaCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        validaCampos


    ],login
)




module.exports=router;