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
import VideoCreate from './pages/Videos/VideoCreate'
import VideoDelete from './pages/Videos/VideoDelete'
import LanguageCreate from './pages/Languages/LanguageCreate'
import LanguageDelete from './pages/Languages/LanguageDelete'
import SeasonCreate from './pages/Seasons/SeasonCreate'
import SeasonDelete from './pages/Seasons/SeasonDelete'


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
        
        <Route path='/languages'>
          <Route index element={<Languages setPath={setPath}/>} />
          <Route path='create' element={<LanguageCreate setPath={setPath}/>} />
          <Route path='delete' element={<LanguageDelete setPath={setPath}/>} />
        </Route>
        
        <Route path='/seasons'>
          <Route index element={<Seasons setPath={setPath}/>} />
          <Route path='create' element={<SeasonCreate setPath={setPath}/>} />
          <Route path='delete' element={<SeasonDelete setPath={setPath}/>} />
        </Route>
        <Route path='/groups' element={<Groups setPath={setPath}/>} />
        <Route path='/lessons' element={<Lessons setPath={setPath}/>} />
        <Route path='/videos'>
          <Route index element={<Videos setPath={setPath}/>} />
          <Route path='create' element={<VideoCreate setPath={setPath}/>} />
          <Route path='delete' element={<VideoDelete setPath={setPath}/>} />
        </Route>
        <Route path='/users' element={<Users setPath={setPath}/>} />
      </Routes>
      </div>

    </div>
    </>
  )
}

export default App
