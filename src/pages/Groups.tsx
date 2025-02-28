import { useEffect, useState } from "react"
import { Card, GroupCard, ListDisplay } from "../components/Tools";
import { useAPI } from "../hooks/useAPI";
import { get_groups, get_languages, get_seasons } from "../utils/apis";
import { ILanguage } from "./Languages";
import { ISeason } from "./Seasons";


// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import update from "../images/utils/update.png";
import { useNavigate } from "react-router";


export interface IGroup{
  _id: string;
  title: string;
  season_id: string;
  lessons: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Groups({setPath}:{setPath:(path: string)=>any}) {
  const {data: groups, fetchAPI: getGroups, loading, error} = useAPI<IGroup[]>();
  const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();
  const {data: seasons, fetchAPI: getSeasons} = useAPI<ISeason[]>();

  // States
  const navigate = useNavigate();
  // Maps
  const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map);
  const [seasonMap, setSeasonMap] = useState<Map<string, ISeason>>(new Map);

  const handleClick = (id: string)=>{
    navigate("view?id="+id);
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
      <h2 className="text-[#EB5A3C] uppercase font-bold">Groups</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/groups/create" />
        <Card label="delete" src={trash} to="/groups/delete" />
        <Card label="update" src={update} to="/groups/update" />
      </div>
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
