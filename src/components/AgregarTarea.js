import React from 'react'
import firebaseApp from '../credenciales'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export const AgregarTarea = ({ arrayTareas, correoUsuario, setArrayTareas }) => {
  let urlDescarga

  async function agregarTarea(e) {
    e.preventDefault()
    const descripcion = e.target.inputDescripcion.value
    // crear nuevo array de tareas
    const nuevoArrayTareas = [
      ...arrayTareas,
      {
        id: Date.now(),
        descripcion: descripcion,
        url: urlDescarga
      }
    ]
    // actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`)
    updateDoc(docuRef, {tareas: [...nuevoArrayTareas]})
    // actualizar estado
    setArrayTareas(nuevoArrayTareas)
    // limpiar form
    e.target.inputDescripcion.value = ""
  }

  async function fileHandler(e) {
    console.log('el archivo es', e.target.files[0]);
    // detectar el archivo
    const archivoLocal = e.target.files[0]
    // añadirlo a storage
    const archivoRef = ref(storage, `documentos/${archivoLocal.name}`)
    const snapShot = await uploadBytes(archivoRef, archivoLocal)
    console.log(snapShot);
    // conseguir el enlace de descarga
    urlDescarga = await getDownloadURL(archivoRef)
  }

  return (
    <div>
      <form onSubmit={agregarTarea}>
        <input type="text" name="" id="inputDescripcion" placeholder='describe tu tarea' />
        <input type="file" name="" id="inputFile" onChange={fileHandler}/>
        <button type='submit'>Agregar tarea</button>
      </form>
    </div>
  )
}
