import { Link } from "react-router"

// Icons
import dashboard from "../images/nav/ViewGridAdd.png"
import sound from "../images/nav/Icon.png"
import slides from "../images/nav/Icon-1.png"
import groups from "../images/nav/Icon-2.png"
import book from "../images/nav/Icon-3.png"
import people from "../images/nav/Icon-4.png"
import dashboard_active from "../images/nav-active/ViewGridAdd.png"
import sound_active from "../images/nav-active/Icon.png"
import slides_active from "../images/nav-active/Icon-1.png"
import groups_active from "../images/nav-active/Icon-2.png"
import book_active from "../images/nav-active/Icon-3.png"
import people_active from "../images/nav-active/Icon-4.png"


export default function Navbar({path}:{path: string}) {
    
    function Item({ src, active_src, label, to }: { src: string; active_src:string; label: string; to: string }){
        return (
            <Link to={to} className="flex items-center space-x-2 uppercase text-sm font-bold ">
                <img src={src} className={`w-6 ${label === path? "hidden": ""}`} />
                <img src={active_src} className={`w-6 ${label === path? "": "hidden"}`} />
                <div className={`${label === path?"text-white" :"text-[#C4DFDF]"} `}>{label}</div>
            </Link>
        )
    }
  return (
    <div className='min-w-[250px] bg-[#EB5A3C] '>
        <h1 className='mt-4 text-center text-xl font-bold stroke-1 text-[#fff]'>SMaster</h1>
        <div className='mt-16 w-[60%] mx-auto space-y-2'>
            <Item src={dashboard} active_src={dashboard_active} label="dashboard" to="/" />
            <Item src={sound} active_src={sound_active} label="languages" to="/languages" />
            <Item src={slides} active_src={slides_active} label="seasons" to="/seasons" />
            <Item src={groups} active_src={groups_active} label="groups" to="/groups" />
            <Item src={book} active_src={book_active} label="lessons" to="/lessons" />
            <Item src={people} active_src={people_active} label="users" to="/users" />
        </div>
    </div>
  )
}
