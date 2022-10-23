import React from 'react';
import axios from 'axios';


/**
 * Éstas constantes pasarlas a un archivo de entorno para que sean borradas de acá....
 * En:  res.data.secure_url
 * es donde se guarda la ruta que ha de ser guardada en la BD que es la ruta de la imagen en el servidor Cloudinary
 */

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ddl3snuoe/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'pzsfr2g4';

const BtnCloudinary = () => {

    const handleInputValue = (async (e) => {
      const file = e.target.files[0];
    
      const formData = new FormData();
      formData.append('file',file);
      formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET);
    
      const res = await axios.post(CLOUDINARY_URL, formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data.secure_url);
  })

  return (
    <div>
      <input type="file" onChange={handleInputValue}/>
    </div>
  )
}

export default BtnCloudinary
