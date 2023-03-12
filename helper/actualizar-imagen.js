const fs= require('fs')
const Usuario = require('../models/usuario.model')
const Medico = require('../models/medico.model')
const Hospital = require('../models/hospital.model')

let pathViejo=''
const borrarImagen=(path)=>{
   
    if(fs.existsSync(path)){
       //borrar la imagen anterior
       fs.unlinkSync(path);
    }
}

const actualizarimagen= async (tipo,id,nombreArchivo)=>{
    console.log('entra');
    switch (tipo) {
        case 'medicos':
             const medico = await Medico.findById(id);
             if(!medico){
                console.log('No existe');
                return false;
             }
              pathViejo = `./uploads/medicos/${medico.img}`
             borrarImagen(pathViejo)

             medico.img=nombreArchivo
             await medico.save();
             return true;

            break;
        case 'hospitales':
             const hospital = await Hospital.findById(id);
             if(!hospital){
                console.log('No existe');
                return false;
             }
             pathViejo = `./uploads/hospitales/${hospital.img}`
             borrarImagen(pathViejo)
             
             hospital.img=nombreArchivo
             await hospital.save();
             return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
             if(!usuario){
                console.log('No existe');
                return false;
             }
             pathViejo = `./uploads/usuarios/${usuario.img}`
             borrarImagen(pathViejo)
             
             usuario.img=nombreArchivo
             await usuario.save();
             return true;
            break;
    
        default:
            break;
    }


}

console.log('actualizarimagen ',actualizarimagen);
module.exports={
    actualizarimagen
}


// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));