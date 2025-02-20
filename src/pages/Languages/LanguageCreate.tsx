import { useEffect, useState } from "react"
import { useAPI } from "../../hooks/useAPI";
import { ILanguage } from "../Languages";
import { create_language } from "../../utils/apis";



export default function LanguageCreate({setPath}:{setPath:(path: string)=>any}) {
    const {fetchAPI} = useAPI<ILanguage>();
    const [title, setTitle] = useState("")
    useEffect(()=>{
        setPath("languages")
    }, []);

  const handleSubmit = async ()=>{
    const response = await fetchAPI(create_language, "POST", {title});
    if(response.success){
      setTitle("");
      alert("Language created successfully!");
    }else{
      alert(response.message);
    }       
  }

  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Create Language</h2>
      <div className="mt-10 ml-4 space-x-4 space-y-4">
        {/* Title */}
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Title</h1>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="e.g ASL" className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" />
        </div>

        <button onClick={handleSubmit} className="text-xl uppercase bg-green-500 text-white px-10 py-1">Create</button>

      </div>
    </section>
  )
}
