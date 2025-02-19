import { useEffect, useState } from "react"
import { LanguageCardDelete } from "../../components/Tools";
import { ILanguage } from "../Languages";
import { defaultLanguages } from "../default";


export default function LanguageDelete({setPath}:{setPath:(path: string)=>any}) {

  const [languages, setLanguages] = useState<ILanguage[]>(defaultLanguages)

  useEffect(()=>{
    setPath("languages")
  }, []);

  const handleClick = ()=>{
    alert("Clicked")
  }

  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete Languages</h2>

      <div className="mt-5 flex flex-wrap space-x-2 space-y-2">
        {
          languages.map((language)=>(
            <LanguageCardDelete title={language.title} handleClick={handleClick} />
          ))
        }
      </div>
    </section>
  )
}
