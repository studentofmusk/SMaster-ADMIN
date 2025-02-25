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
import GroupCreate from './pages/Groups/GroupCreate'
import GroupDelete from './pages/Groups/GroupDelete'
import LessonCreate from './pages/Lessons/LessonCreate'
import LessonDelete from './pages/Lessons/LessonDelete'
import Lecture from './pages/Lecture'
import V2Text from './pages/V2Text'
import NotFound from './pages/NotFound'
import T2Video from './pages/T2Video'
import V2Action from './pages/V2Action'
import T2Action from './pages/T2Action'
import LectureDelete from './pages/Lecture/LectureDelete'
import LectureCreate from './pages/Lecture/LectureCreate'
import V2TextDelete from './pages/V2Text/V2TextDelete'
import V2TextCreate from './pages/V2Text/V2TextCreate'
import T2VideoDelete from './pages/T2Video/T2VideoDelete'
import T2VideoCreate from './pages/T2Video/T2VideoCreate'
import V2ActionDelete from './pages/V2Action/V2ActionDelete'
import V2ActionCreate from './pages/V2Action/V2ActionCreate'
import T2ActionCreate from './pages/T2Action/T2ActionCreate'
import T2ActionDelete from './pages/T2Action/T2ActionDelete'
import LessonView from './pages/Lessons/LessonView'
import LessonUpdate from './pages/Lessons/LessonUpdate'


function App() {
  const [path, setPath] = useState("dashboard");


  return (
    <>
    <div className='flex h-screen'>
      <Navbar path={path} />
      <div className='w-full h-full flex flex-col'>
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

        <Route path='/groups'>
          <Route index element={<Groups setPath={setPath}/>} />
          <Route path='create' element={<GroupCreate setPath={setPath}/>} />
          <Route path='delete' element={<GroupDelete setPath={setPath}/>} />
        </Route>
        
        <Route path='/lessons'>
          <Route index element={<Lessons setPath={setPath}/>} />
          <Route path='create' element={<LessonCreate setPath={setPath}/>} />
          <Route path='delete' element={<LessonDelete setPath={setPath}/>} />
          <Route path='view' element={<LessonView setPath={setPath}/>} />
          <Route path='update' element={<LessonUpdate setPath={setPath}/>} />
        </Route>
        
        <Route path='/lecture'>
          <Route index element={<Lecture setPath={setPath}/>} />
          <Route path='create' element={<LectureCreate setPath={setPath}/>} />
          <Route path='delete' element={<LectureDelete setPath={setPath}/>} />
        </Route>
        <Route path='/v2text'>
          <Route index element={<V2Text setPath={setPath}/>} />
          <Route path='create' element={<V2TextCreate setPath={setPath}/>} />
          <Route path='delete' element={<V2TextDelete setPath={setPath}/>} />
        </Route>
        <Route path='/t2video'>
          <Route index element={<T2Video setPath={setPath}/>} />
          <Route path='create' element={<T2VideoCreate setPath={setPath}/>} />
          <Route path='delete' element={<T2VideoDelete setPath={setPath}/>} />
        </Route>
        <Route path='/v2action'>
          <Route index element={<V2Action setPath={setPath}/>} />
          <Route path='create' element={<V2ActionCreate setPath={setPath}/>} />
          <Route path='delete' element={<V2ActionDelete setPath={setPath}/>} />
        </Route>
        <Route path='/t2action'>
          <Route index element={<T2Action setPath={setPath}/>} />
          <Route path='create' element={<T2ActionCreate setPath={setPath}/>} />
          <Route path='delete' element={<T2ActionDelete setPath={setPath}/>} />
        </Route>

        <Route path='/videos'>
          <Route index element={<Videos setPath={setPath}/>} />
          <Route path='create' element={<VideoCreate setPath={setPath}/>} />
          <Route path='delete' element={<VideoDelete setPath={setPath}/>} />
        </Route>
        <Route path='/users' element={<Users setPath={setPath}/>} />

        <Route path='/*' element={<NotFound />} />
      </Routes>
      </div>

    </div>
    </>
  )
}

export default App
