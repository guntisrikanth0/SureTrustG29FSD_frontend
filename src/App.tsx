
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Resetpassword from './pages/Resetpassword'
import Notificationpage from './pages/Notificationpage'
import Friends from './pages/friends'
import Profile from './pages/profile'
import Error from './pages/Error'
function App() {

  return (
    <>
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/resetpassword" element={<Resetpassword />} />
  <Route path="/notification" element={<Notificationpage />} />
  <Route path="/friends" element={<Friends />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="*" element={<Error />} />
</Routes>
  </BrowserRouter>
  
     </>
  )
}

export default App
