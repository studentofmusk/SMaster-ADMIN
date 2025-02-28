import { useEffect, useState } from "react"
import {GroupCard, ListDisplay } from "../../components/Tools";
import { IGroup } from "../Groups";
import { useAPI } from "../../hooks/useAPI";
import { ILanguage } from "../Languages";
import { ISeason } from "../Seasons";
import { get_groups, get_languages, get_seasons } from "../../utils/apis";
import { useNavigate } from "react-router";


export default function GroupUpdate({setPath}:{setPath:(path: string)=>any}) {
  const {data: groups, fetchAPI: getGroups, loading, error} = useAPI<IGroup[]>();
  const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();
  const {data: seasons, fetchAPI: getSeasons} = useAPI<ISeason[]>();
  

  // Maps
  const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map);
  const [seasonMap, setSeasonMap] = useState<Map<string, ISeason>>(new Map);

  //States
  const navigate = useNavigate();

  const handleClick = (id: string)=>{
    navigate("view?id="+id)
  }

  useEffect(()=>{
    setPath("groups")
  }, [])

  useEffect(()=>{
    setLanguageMap(new Map(languages?.map((language)=>[language._id, language])));
  }, [languages])

  useEffect(()=>{
    setSeasonMap(new Map(seasons?.map((season)=>[season._id, season])));
  }, [seasons])


  useEffect(()=>{
    getLanguages(get_languages);
    getSeasons(get_seasons);
    getGroups(get_groups);
  }, [])
  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Update Groups</h2>

      <ListDisplay
        data={groups}
        error={error}
        loading={loading}
        renderItem={(group)=>{
          const season = seasonMap.get(group?.season_id || "No Season");
          const seasonName = season?.title;
          const language = languageMap.get(season?.language_id || "");
          const languageName = language?.title;
          return <GroupCard 
                    title={group.title}
                    season={seasonName}
                    language={languageName}
                    handleClick={()=>handleClick(group._id)}/>
        }}
        emptyMessage="No Lessons Found!"
        className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll items-start"
      />
    </section>
  )
}
