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
import TopNav from './components/TopNav'
import Videos from './pages/Videos'


function App() {
  const [path, setPath] = useState("dashboard");


  return (
    <>
    <div className='flex h-screen'>
      <Navbar path={path} />
      <div className='w-full'>
      <TopNav/>
      <Routes>
        <Route path='/' element={<Home setPath={setPath}/>} />
        <Route path='/languages' element={<Languages setPath={setPath}/>} />
        <Route path='/seasons' element={<Seasons setPath={setPath}/>} />
        <Route path='/groups' element={<Groups setPath={setPath}/>} />
        <Route path='/lessons' element={<Lessons setPath={setPath}/>} />
        <Route path='/videos' element={<Videos setPath={setPath}/>} />
        <Route path='/users' element={<Users setPath={setPath}/>} />
      </Routes>
      </div>

    </div>
    </>
  )
}

export default App
