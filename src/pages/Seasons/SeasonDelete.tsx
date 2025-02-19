import { useEffect, useState } from "react"
import {SeasonCardDelete } from "../../components/Tools";
import { defaultSeasons } from "../default";


export default function SeasonDelete({setPath}:{setPath:(path: string)=>any}) {

  const [seasons, setSeasons] = useState(defaultSeasons)

  useEffect(()=>{
    setPath("seasons")
  }, []);

  const handleClick = ()=>{
    alert("Clicked")
  }

  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete Languages</h2>

      <div className="mt-5">
        {
          seasons.map((season)=>(
            <SeasonCardDelete title={season.title} handleClick={handleClick} />
          ))
        }
      </div>
    </section>
  )
}
