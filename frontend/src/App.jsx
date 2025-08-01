import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <> 
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/setting" element={<SettingPage/>} />
        <Route path="/profile" element={<ProfilePage/>} /> 
      </Routes>   
    </>
  )
}

export default App