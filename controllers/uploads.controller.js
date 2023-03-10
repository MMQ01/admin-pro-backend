const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarimagen } = require("../helper/actualizar-imagen");
const path=require('path')
const fs = require('fs')


const fileUpload =(req,res=response)=>{

    const tipo=req.params.tipo;
    const id=req.params.id;


    const tiposValidos=['hospitales','medicos','usuarios']
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'No es un médico, usuario u hospital'
        })
    }

    //validar que exita un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        })
      }

      //procesar la imagen....

      const file = req.files.imagen;
       const nombreCortado= file.name.split('.')
       const extensionArchivo=nombreCortado [nombreCortado.length - 1]

       //validar extension

       const extensionesValidas =['png','jpg','jpeg','gif'];
       if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'No es una extension permitida'
        })
       }

       //generar el nombre del archivo
       const nombreArchivo =`${uuidv4()}.${extensionArchivo}`;

       //Path para guardar la imagen

       const path=`./uploads/${tipo}/${nombreArchivo}`

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err){
            return res.status(500).json({
                ok:false,
                msg:'Error al mover la imagen'
            })
        }
        //Actualizar base de datos
        actualizarimagen(tipo,id,nombreArchivo)
        
        

        res.json({
            ok:true,
            msg:'Archivo guardado',
            nombreArchivo
        })
    });

       
}


const retornaImagen=(req, res=response)=>{
    const tipo=req.params.tipo
    const foto = req.params.foto

    const pathImg= path.join(__dirname,`../uploads/${tipo}/${foto}`)

    //imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg)
       
    }else{
        const pathImg= path.join(__dirname,`../uploads/no-img.jpg`)
        res.sendFile(pathImg)
    }

}



module.exports={
    fileUpload,
    retornaImagen
}