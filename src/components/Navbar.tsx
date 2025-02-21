import { Link } from "react-router"

// Icons
import dashboard from "../images/nav/ViewGridAdd.png"
import sound from "../images/nav/Icon.png"
import slides from "../images/nav/Icon-1.png"
import groups from "../images/nav/Icon-2.png"
import book from "../images/nav/Icon-3.png"
import people from "../images/nav/Icon-4.png"
import lecture from "../images/nav/Lecture.png"
import v2text from "../images/nav/V2Text.png"
import t2video from "../images/nav/T2Video.png"
import v2action from "../images/nav/V2Action.png"
import t2action from "../images/nav/T2Action.png"
import video from "../images/nav/Play.png"


import dashboard_active from "../images/nav-active/ViewGridAdd.png"
import sound_active from "../images/nav-active/Icon.png"
import slides_active from "../images/nav-active/Icon-1.png"
import groups_active from "../images/nav-active/Icon-2.png"
import book_active from "../images/nav-active/Icon-3.png"
import people_active from "../images/nav-active/Icon-4.png"
import lecture_active from "../images/nav-active/Lecture-active.png"
import v2text_active from "../images/nav-active/V2Text-active.png"
import t2video_active from "../images/nav-active/T2Video-active.png"
import v2action_active from "../images/nav-active/V2Action-active.png"
import t2action_active from "../images/nav-active/T2Action-active.png"
import video_active from "../images/nav-active/Play-active.png"


export default function Navbar({path}:{path: string}) {
    
    function Item({ src, active_src, label, to, className }: { src: string; active_src:string; label: string; to: string, className?:string }){
        return (
            <Link to={to} className="flex items-center space-x-2 uppercase text-sm font-bold ">
                <img src={src} className={`w-6 ${label === path? "hidden": ""} ${className} `} />
                <img src={active_src} className={`w-6 ${label === path? "": "hidden"} ${className} `} />
                <div className={`${label === path?"text-white" :"text-[#C4DFDF]"} `}>{label}</div>
            </Link>
        )
    }
  return (
    <div className='min-w-[250px] bg-[#EB5A3C] '>
        <h1 className='mt-4 text-center text-xl font-bold stroke-1 text-[#fff]'>SMaster</h1>
        <div className='mt-16 w-[60%] mx-auto space-y-3'>
            <Item src={dashboard} active_src={dashboard_active} label="dashboard" to="/" />
            <Item src={sound} active_src={sound_active} label="languages" to="/languages" />
            <Item src={slides} active_src={slides_active} label="seasons" to="/seasons" />
            <Item src={groups} active_src={groups_active} label="groups" to="/groups" />
            <Item src={book} active_src={book_active} label="lessons" to="/lessons" />
            <Item src={lecture} className="w-7 -translate-x-1" active_src={lecture_active} label="lecture" to="/lecture" />
            <Item src={v2text} className="w-7 -translate-x-1" active_src={v2text_active} label="v2text" to="/v2text" />
            <Item src={t2video} className="w-7 -translate-x-1" active_src={t2video_active} label="t2video" to="/t2video" />
            <Item src={v2action} className="w-7 -translate-x-1" active_src={v2action_active} label="v2action" to="/v2action" />
            <Item src={t2action} className="w-7 -translate-x-1" active_src={t2action_active} label="t2action" to="/t2action" />
            <Item src={video} active_src={video_active} label="videos" to="/videos" />
            <Item src={people} active_src={people_active} label="users" to="/users" />
        </div>
    </div>
  )
}
