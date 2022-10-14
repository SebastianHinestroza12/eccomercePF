import React from 'react'
import { useForm } from 'react-hook-form'

function NewProduct() {
    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

  return (
    <div>
        <h1>Nuevo Producto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>Nombre</label>
            <input type="text" {...register('nombre', {
                required: true,
                maxLength: 10,
                minLength: 5
            })}/>
        </div>
        <div>
            <label>Categoria</label>
            <input type="text" {...register('categoria', {
                required: true,
                maxLength: 10
            })}/>
        </div>
        <div>
            <label>Foto</label>
            <input type="text" {...register('foto', {
                required: true,
                maxLength: 10
            })}/>
        </div>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}

export default NewProduct
