import { useEffect, useState } from "react"
import {GroupCardDelete, ListDisplay } from "../../components/Tools";
import { IGroup } from "../Groups";
import { useAPI } from "../../hooks/useAPI";
import { ILanguage } from "../Languages";
import { ISeason } from "../Seasons";
import { delete_group, get_groups, get_languages, get_seasons } from "../../utils/apis";


export default function GroupDelete({setPath}:{setPath:(path: string)=>any}) {
  const {data: groups, fetchAPI: getGroups, loading, error} = useAPI<IGroup[]>();
  const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();
  const {data: seasons, fetchAPI: getSeasons} = useAPI<ISeason[]>();
  const {fetchAPI: deleteGroup} = useAPI<IGroup>();

  // Maps
  const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map);
  const [seasonMap, setSeasonMap] = useState<Map<string, ISeason>>(new Map);

  const handleDelete = async(id: string, title: string)=>{
    try {
      if(!id) return;
      const response = await deleteGroup(delete_group, "POST", {
        group_id: id
      })
      if (response.success){
        alert(`Group [${title}] is deleted!`);
        getGroups(get_groups);
      }else{
        alert(response.message);
      }
    } catch (error) {
      
    }
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
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete Groups</h2>

      <ListDisplay
        data={groups}
        error={error}
        loading={loading}
        renderItem={(group)=>{
          const season = seasonMap.get(group?.season_id || "No Season");
          const seasonName = season?.title;
          const language = languageMap.get(season?.language_id || "");
          const languageName = language?.title;
          return <GroupCardDelete 
                    title={group.title}
                    season={seasonName}
                    language={languageName}
                    handleDelete={()=>handleDelete(group._id, group.title)}/>
        }}
        emptyMessage="No Lessons Found!"
        className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll items-start"
      />
    </section>
  )
}
