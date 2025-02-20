import { useEffect, useState } from "react"
import { ILanguage } from "../Languages";
import { useAPI } from "../../hooks/useAPI";
import { add_season, create_season, get_languages } from "../../utils/apis";
import { ISeason } from "../Seasons";



export default function SeasonCreate({setPath}:{setPath:(path: string)=>any}) {
    const {data: languages, fetchAPI} = useAPI<ILanguage[]>();
    const {fetchAPI: SeasonAPI} = useAPI<ISeason>();
    
    const [title, setTitle] = useState("");
    const [languageId, setLanguageId] = useState("")
    
    useEffect(()=>{
        setPath("seasons")
    }, []);

    useEffect(()=>{
        fetchAPI(get_languages);
    }, []);

  const handleSubmit = async()=>{
    try {
      if(!title || !languageId ) alert("Please fullfill the requirements!");
      
      const response = await SeasonAPI(create_season, "POST", {title, language_id:languageId});
      if(response.success){
        const season_id = response.data?._id;
        const res = await SeasonAPI(add_season, "POST", {season_id, language_id: languageId});
        if(res.success){
          setTitle("");
          alert("Season Created and Added Successfully!");
        }else{
          alert("Season created! but not associated with Language, due to " + res.message)
        }
      }else{
        alert(response.message);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  }
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Create Season</h2>
      <div className="mt-10 ml-4 space-x-4 space-y-4">
        {/* Title */}
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Title</h1>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="e.g SEASON 1" className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" />
        </div>

        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Language</h1>
          <select value={languageId} onChange={(e)=>setLanguageId(e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
            <option value="">SELECT</option>
            {languages && languages.length >0 
             ?languages.map((language)=>(
                  <option value={language._id}>{language.title}</option>
              ))
             :<></>
            }
          </select>
        </div>

        <button onClick={handleSubmit} className="text-xl uppercase bg-green-500 text-white px-10 py-1">Create</button>

      </div>
    </section>
  )
}
