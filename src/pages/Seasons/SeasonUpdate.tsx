import { useEffect, useState } from "react"
import {ListDisplay, SeasonCard } from "../../components/Tools";
import { ISeason } from "../Seasons";
import { useAPI } from "../../hooks/useAPI";
import { get_languages, get_seasons } from "../../utils/apis";
import { ILanguage } from "../Languages";
import { useNavigate } from "react-router";


export default function SeasonUpdate({setPath}:{setPath:(path: string)=>any}) {
  
    const {data: seasons, fetchAPI:getSeasons, error, loading} = useAPI<ISeason[]>();
    const {data: languages, fetchAPI:getLanguages} = useAPI<ILanguage[]>();


  // Maps
  const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map);

    // States
    const navigate = useNavigate();

  const handleClick = (id:string)=>{
    navigate("view?id="+id);
  }

  useEffect(()=>{
    setPath("seasons")
  }, []);

  
  useEffect(()=>{
    getLanguages(get_languages);
    getSeasons(get_seasons);
  }, [])
  
  
  useEffect(()=>{
    setLanguageMap(new Map(languages?.map((language)=>[language._id, language])))
  }, [languages]);
  
  


  
  return (
    <section className="px-10 h-[85vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Update Seasons</h2>

      <ListDisplay
        loading={loading}
        error={error}
        data={seasons}
        renderItem={(season) =>{
          let language = languageMap.get(season.language_id);
          return (
            <SeasonCard
            title={season.title} 
            handleClick={()=>handleClick(season._id)} 
            language={language?.title}
            />
          )
        } }
        emptyMessage="No seasons available."
        className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll"
      />
    </section>
  )
}
