import { useEffect } from "react"
import { Link } from "react-router";

// Images
import sound from "../images/dashboard/Icon-4.png";
import slides from "../images/dashboard/Icon.png";
import groups from "../images/dashboard/Icon-1.png";
import book from "../images/dashboard/Icon-2.png";
import people from "../images/dashboard/Icon-3.png";
import video from "../images/dashboard/Icon-6.png";
import lecture from "../images/dashboard/Lecture.png";
import v2text from "../images/dashboard/V2Text.png";
import t2video from "../images/dashboard/T2Video.png";
import v2action from "../images/dashboard/V2Action.png";
import t2action from "../images/dashboard/T2Action.png";


interface IBox {
  label: string;
  src: string; 
  to: string;
}

export default function Home({setPath}:{setPath:(path: string)=>any}) {
  useEffect(()=>{
    setPath("dashboard")
  }, [])

  const Box = ({label, src, to}:IBox)=>(
    <Link to={to} className="flex flex-col items-center justify-center p-4 bg-[#DF9755] rounded-sm w-36 h-36">
      <img src={src} className="w-12" />
      <div className="uppercase text-white mt-2 text-xs font-bold">{label}</div>
    </Link>
  )
  return (
    <section className="px-10">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Dashboard</h2>
      <div className="flex flex-wrap p-10 space-x-10 space-y-10 ">
        <Box label="Languages" to="/languages" src={sound} />
        <Box label="Seasons" to="/seasons" src={slides} />
        <Box label="Groups" to="/groups" src={groups} />
        <Box label="Lessons" to="/lessons" src={book} />
        <Box label="Lectures" to="/lecture" src={lecture} />
        <Box label="V2Texts" to="/v2text" src={v2text} />
        <Box label="T2Video" to="/t2video" src={t2video} />
        <Box label="V2Action" to="/v2action" src={v2action} />
        <Box label="T2Action" to="/t2action" src={t2action} />
        <Box label="Videos" to="/videos" src={video} />
        <Box label="Users" to="/users" src={people} />
      </div>
    </section>
  )
}
