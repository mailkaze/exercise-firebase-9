import React from 'react'

export const ListadoTareas = ({ arrayTareas }) => {
  return (
    <div>
      {arrayTareas.map((objetoTarea) => {
        return (
          <p>
            <span>{objetoTarea.descripcion}</span>
            <button>Ver archivo</button>
            <button>Eliminar tarea</button>
          </p>
        )
      })}
    </div>
  )
}
