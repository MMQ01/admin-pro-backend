const express = require('express')
require('dotenv').config();
const {dbConnection}= require('./databases/config')
const cors = require('cors')
//crear servidor de express
const app =express()

//cors
app.use(cors())
//BASE DE DATOS
dbConnection()


// console.log(process.env);
//rutas
app.get('/',(req,res)=>{

    res.json({
        ok:true,
        msg:'Hola Mundo'
    })
});




app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en el prueto '+ process.env.PORT);
})

//mongo db mmq01 mmq01