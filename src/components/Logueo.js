import { useState } from 'react'
import firebaseApp from '../credenciales';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithRedirect, 
  GoogleAuthProvider 
} from "firebase/auth"
import { async } from '@firebase/util';
// instancio la clase auth con mi aplicación de firebase y sus credenciales como parámetro
const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()

export const Logueo = () => {
  const [estaRegistrandose, setEstaRegistrandose] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault()
    // el evento se dispara en el form por lo que puedo acceder a los IDs de los inputs desde el target
    const correo = e.target.emailInput.value
    const contra = e.target.passwordInput.value
    if (estaRegistrandose) {
      const usuario = await createUserWithEmailAndPassword(auth, correo, contra)
    } else {
      signInWithEmailAndPassword(auth, correo, contra)
    }
  }

  return (
    <div>
      <h1>{estaRegistrandose ? "Regístrate" : "Inicia sesión"}</h1>
      <form onSubmit={submitHandler}>
        <input type="email" name="" id="emailInput" />
        <input type="password" name="" id="passwordInput" />
        <button>{estaRegistrandose ? "Regístrate" : "Inicia sesión"}</button>
      </form>
        <button onClick={() => signInWithRedirect(auth, googleProvider)}>Acceder con Google</button>
        <button onClick={() => setEstaRegistrandose(!estaRegistrandose)}>{estaRegistrandose ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? regístrate"}</button>
    </div>
  )
}
