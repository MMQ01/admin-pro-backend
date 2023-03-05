const express = require('express')
require('dotenv').config();
const {dbConnection}= require('./databases/config')
const cors = require('cors')
//crear servidor de express
const app =express()

//cors
app.use(cors())

//lectura y parseo del body
app.use(express.json())

//BASE DE DATOS
dbConnection()


//rutas
app.use('/api/usuarios', require('./routes/usuarios.route'))
app.use('/api/login', require('./routes/auth.route'))




app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en el prueto '+ process.env.PORT);
})

//mongo db mmq01 mmq01