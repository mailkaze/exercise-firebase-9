import React from 'react'
import firebaseApp from '../credenciales'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'

const firestore = getFirestore(firebaseApp)

export const ListadoTareas = ({ arrayTareas, correoUsuario, setArrayTareas }) => {

  async function eliminarTarea(idTarea) {
    // crear nuevo array de tareas
    const nuevoArrayTareas = arrayTareas.filter(
      objetoTarea => objetoTarea.id !== idTarea
    )
    // actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`)
    updateDoc(docuRef, { tareas: [...nuevoArrayTareas] })
    // actualizar state
    setArrayTareas(nuevoArrayTareas)
  }

  return (
    <div>
      {arrayTareas.map((objetoTarea) => {
        return (
          <p>
            <span>{objetoTarea.descripcion}</span>
            <a href={objetoTarea.url}>
              <button>Ver archivo</button>
            </a>
            <button onClick={() => eliminarTarea(objetoTarea.id)}>Eliminar tarea</button>
          </p>
        )
      })}
    </div>
  )
}
