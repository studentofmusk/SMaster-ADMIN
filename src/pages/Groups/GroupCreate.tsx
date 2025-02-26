import { useEffect, useState } from "react"
import { ISeason } from "../Seasons";
import { ILanguage } from "../Languages";
import { useAPI } from "../../hooks/useAPI";
import { create_group, get_languages, get_seasons } from "../../utils/apis";
import { IGroup } from "../Groups";



export default function GroupCreate({setPath}:{setPath:(path: string)=>any}) {
  const {data:languages, fetchAPI:getLanguages} = useAPI<ILanguage[]>();
  const {data:seasons, fetchAPI:getSeasons} = useAPI<ISeason[]>();
  const { fetchAPI:createGroup, loading} = useAPI<IGroup[]>();
  
  // States
  const [title, setTitle] = useState("")
  const [languageId, setLanguageId] = useState("")
  const [seasonId, setSeasonId] = useState("")
  

    useEffect(()=>{
        setPath("seasons")
    }, []);

    useEffect(()=>{
        getLanguages(get_languages);
        getSeasons(get_seasons);
    }, []);


  const handleSubmit = async()=>{
    try {
      if(!title || !seasonId) return alert("Please fulfill the requirements!");

      const response = await createGroup(create_group, "POST", {
        title,
        season_id: seasonId
      });

      if (response.success){
        alert("Group Created Successfully!")
        setTitle("");
        setLanguageId("");
        setSeasonId("");
      }else{
        alert(response.message);
      }

    } catch (error) {
      alert("Something went wrong!");
    }
  }

  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Create Group</h2>
      <div className="mt-10 ml-4 space-x-4 space-y-4">
        {/* Title */}
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Title</h1>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="e.g Cooking" className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" />
        </div>

        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Language</h1>
          <select value={languageId} onChange={(e)=>setLanguageId(e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
            <option value="">SELECT</option>
            { languages && languages.length > 0?
                languages.map((language)=>(
                    <option value={language._id}>{language.title}</option>
                )):""
            }
          </select>
        </div>
        
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Season</h1>
          <select value={seasonId} onChange={(e)=>setSeasonId(e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
            <option value="">SELECT</option>
            { seasons && seasons.length>0?   
                seasons.filter((season)=>season.language_id === languageId).map((season)=>(
                    <option value={season._id}>{season.title}</option>
                )):""
            }
          </select>
        </div>

        <button onClick={handleSubmit} disabled={loading} className="text-xl uppercase bg-green-500 text-white px-10 py-1">Create</button>

      </div>
    </section>
  )
}
