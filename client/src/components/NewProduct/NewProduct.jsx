import React from 'react'
import { useForm } from 'react-hook-form'

function NewProduct() {
    const {register, formState: {errors}, handleSubmit, watch} = useForm({
      defaultValues: {
        nombre: 'Pepita',
        categoria: 'nada',
        email: 'christian@hotmial.com'
      }
    })

    console.log(watch('nombre'))
    const incluirTelefono = watch('incluirTelefono')

    const onSubmit = (data) => {
        console.log(data)
    }

    const edadValidator = (value) => {
      return value >= 18 && value <= 65
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
            {errors.nombre?.type === 'required' && <p>El campo nombre es requerido</p>}
            {errors.nombre?.type === 'maxLength' && <p>Debe tener menos de 10 letras</p>}
            {errors.nombre?.type === 'minLength' && <p>Debe tener mas de 5   letras</p>}
        </div>
        <div>
            <label>Categoria</label>
            <input type="text" {...register('categoria', {
                required: true,
                min:1,
                max:10
            })}/>
        </div>
        <div>
            <label>Foto</label>
            <input type="text" {...register('foto', {
                required: true,
                maxLength: 10
            })}/>
        </div>
        <div>
            <label>Email</label>
            <input type="text" {...register('email', {
                pattern: /^\S+@\S+\.\S+$/
            })}/>
            {errors.email?.type === 'pattern' && <p>El formato debe ser tipo EMAIL</p>}
        </div>
        <div>
            <label>Edad</label>
            <input type="text" {...register('edad', {
                validate: edadValidator
            })}/>
            {errors.edad && <p>La edad debe ser entre 18 y 65 años</p>}
        </div>
        <div>
          <label>¿Incluir teléfono?</label>
          <input type="checkbox" {...register('incluirTelefono')}/>
        </div>
        {incluirTelefono && (
        <div>
          <label>Teléfono</label>
          <input type="text" {...register('telefono')}/>
        </div>

        )}
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}

export default NewProduct
