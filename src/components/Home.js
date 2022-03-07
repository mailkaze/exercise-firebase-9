import React from 'react'
import firebaseApp from '../credenciales'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(firebaseApp)

export const Home = () => {
  return (
    <div>
      Hola, sesión iniciada
      <button onClick={() => signOut(auth)}>Cerrar sesión</button>
    </div>
  )
}
