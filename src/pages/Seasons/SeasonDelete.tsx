import { useEffect, useState } from "react"
import {ListDisplay, SeasonCardDelete } from "../../components/Tools";
import { ISeason } from "../Seasons";
import { useAPI } from "../../hooks/useAPI";
import { delete_season, get_languages, get_seasons } from "../../utils/apis";
import { ILanguage } from "../Languages";


export default function SeasonDelete({setPath}:{setPath:(path: string)=>any}) {
  
    const {data: seasons, fetchAPI:getSeasons, error, loading} = useAPI<ISeason[]>();
    const {data: languages, fetchAPI:getLanguages} = useAPI<ILanguage[]>();
    const {fetchAPI: deleteSeason} = useAPI<ISeason>();

  // Maps
  const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map);


  const handleDelete = async(id:string, title: string)=>{
    try {
      const response = await deleteSeason(delete_season, 'POST', {
        season_id:id
      });

      if(response.success){
        alert(`Season [${title}] is Deleted!`);
        getSeasons(get_seasons);
      }
      else{
        alert(response.message);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
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
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete Seasons</h2>

      <ListDisplay
        loading={loading}
        error={error}
        data={seasons}
        renderItem={(season) =>{
          let language = languageMap.get(season.language_id);
          return (
            <SeasonCardDelete
            title={season.title} 
            handleDelete={()=>handleDelete(season._id, season.title)} 
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
