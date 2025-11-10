import { useState } from "react"
import { useAuth } from "../hooks/useAuth";

export default function GestionarUsuarios() {
  const [profesores, setProfesores] = useState();
  const { user } = useAuth()

  const handleAction = async (e) => {
    e.preventDefault()
  }
  return (
    <>
    </>
  )
}
