import { useState, useEffect } from 'react'
import firebaseApp from '../credenciales'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

import { AgregarTarea } from './AgregarTarea'
import { ListadoTareas } from './ListadoTareas'

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

export const Home = ({ correoUsuario }) => {
  const [arrayTareas, setArrayTareas] = useState(null);

  const fakeData = [
    { id: 1, descripcion: "tarea falsa 1", url: "https://picsum.photos/420" },
    { id: 2, descripcion: "tarea falsa 2", url: "https://picsum.photos/420" },
    { id: 3, descripcion: "tarea falsa 3", url: "https://picsum.photos/420" },
    { id: 4, descripcion: "tarea falsa 4", url: "https://picsum.photos/420" },
  ]

  const buscarDocumentoOCrearDocumento = async (idDocumento) => {
    // crear referencia al documento
    const docuRef = doc(firestore, `usuarios/${idDocumento}`)
    // buscar documento
    const consulta = await getDoc(docuRef)
    if (consulta.exists()) {
      const infoDocu = consulta.data()
      return infoDocu.tareas
    } else {
      await setDoc(docuRef, {tareas: [...fakeData]})
      const consulta = await getDoc(docuRef)
      const infoDocu = consulta.data()
      return infoDocu.tareas
    }
  }

  useEffect(() => {
    const fetchTareas = async () => {
      const tareasFetchadas = await buscarDocumentoOCrearDocumento(correoUsuario)
      setArrayTareas(tareasFetchadas)
    }
    fetchTareas()
  }, [])

  return (
    <div>
      Hola, sesión iniciada
      <button onClick={() => signOut(auth)}>Cerrar sesión</button>
      <hr />
      <AgregarTarea
        arrayTareas={arrayTareas} 
        setArrayTareas={setArrayTareas}
        correoUsuario={correoUsuario}
      />
      {
        arrayTareas
        ? <ListadoTareas 
            arrayTareas={arrayTareas} 
            setArrayTareas={setArrayTareas}
            correoUsuario={correoUsuario}
          />
        : null
      }
    </div>
  )
}
