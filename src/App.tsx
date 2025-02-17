import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Languages from './pages/Languages'
import Navbar from './components/Navbar'
import { useState } from 'react'
import Seasons from './pages/Seasons'
import Groups from './pages/Groups'
import Lessons from './pages/Lessons'
import Users from './pages/Users'


function App() {
  const [path, setPath] = useState("dashboard");


  return (
    <>
    <div className='flex h-screen'>
      <Navbar path={path} />
      <Routes>
        <Route path='/' element={<Home setPath={setPath}/>} />
        <Route path='/languages' element={<Languages setPath={setPath}/>} />
        <Route path='/seasons' element={<Seasons setPath={setPath}/>} />
        <Route path='/groups' element={<Groups setPath={setPath}/>} />
        <Route path='/lessons' element={<Lessons setPath={setPath}/>} />
        <Route path='/users' element={<Users setPath={setPath}/>} />
      </Routes>

    </div>
    </>
  )
}

export default App
