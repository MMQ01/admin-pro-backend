const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection=async()=>{
    mongoose.set('strictQuery', false);
    try {
        
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useCreateIndex:true
        });
        console.log('BD online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos')
    }


}

module.exports={
    dbConnection
}