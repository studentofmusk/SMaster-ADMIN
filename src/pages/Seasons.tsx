import { useEffect, useState } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, SeasonCard } from "../components/Tools";
import { defaultLanguages, defaultSeasons } from "./default";

export interface ISeason {
  _id: string;
  title: string;
  language_id: string;
  groups: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Seasons({setPath}:{setPath:(path: string)=>any}) {
  const [seasons, setSeasons] = useState(defaultSeasons)
  const [languages, setLanguages] = useState(defaultLanguages)

  const handleClick = ()=>{

  }
  useEffect(()=>{
    setPath("seasons")
  }, [])
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Seasons</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/seasons/create" />
        <Card label="delete" src={trash} to="/seasons/delete" />
      </div>

      <div className="mt-5">
        {
          seasons.map((season)=>(
            <SeasonCard title={season.title} handleClick={handleClick} />
          ))
        }
      </div>
    </section>
  )
}
