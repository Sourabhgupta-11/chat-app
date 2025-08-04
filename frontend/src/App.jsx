import React, { useEffect } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingPage from './pages/SettingPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import HomePage from './pages/HomePage.jsx'
import { Loader } from 'lucide-react'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore() 
  
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth && !authUser) {   //isCheckingAuth is a state that indicates if the auth check is in progress(only show loading)
    return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin text-blue-500" size={32} />
    </div>
    )
  }
  
  return (
    <> 
      <Navbar />
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/setting" element={<SettingPage/>} />
        <Route path="/profile" element={<ProfilePage/>} /> 
      </Routes>   
    </>
  )
}

export default App