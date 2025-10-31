import { Route, Routes } from 'react-router'
import './App.css'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
