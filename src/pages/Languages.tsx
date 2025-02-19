import { useEffect, useState } from "react"
import { Card, LanguageCard } from "../components/Tools";

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { defaultLanguages } from "./default";

export interface ILanguage{
  _id: string;
  title: string;
  seasons: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export default function Languages({setPath}:{setPath:(path: string)=>any}) {

  const [languages, setLanguages] = useState<ILanguage[]>(defaultLanguages)

  useEffect(()=>{
    setPath("languages")
  }, []);

  const handleClick = ()=>{

  }

  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Languages</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/languages/create" />
        <Card label="delete" src={trash} to="/languages/delete" />
      </div>

      <div className="mt-5">
        {
          languages.map((language)=>(
            <LanguageCard title={language.title} handleClick={handleClick} />
          ))
        }
        
      </div>
    </section>
  )
}
