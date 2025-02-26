import { useEffect, useState } from "react"

import {  LessonCard, ListDisplay } from "../../components/Tools";
import { IGroup } from "../Groups";
import { useAPI } from "../../hooks/useAPI";
import { get_groups, get_languages, get_lessons, get_seasons} from "../../utils/apis";
import { ISeason } from "../Seasons";
import { ILanguage } from "../Languages";
import { ILesson } from "../Lessons";
import { useNavigate } from "react-router";


export default function LessonUpdate({setPath}:{setPath:(path: string)=>any}) {
  const navigate = useNavigate();

  const {data: lessons, fetchAPI: getLessons, loading, error} = useAPI<ILesson[]>()
  const {data: groups, fetchAPI: getGroups} = useAPI<IGroup[]>();
  const {data: seasons, fetchAPI: getSeasons} = useAPI<ISeason[]>();
  const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();

  // Maps
  const [groupMap, setGroupMap] = useState<Map<string, IGroup>>(new Map());
  const [seasonMap, setSeasonMap] = useState<Map<string, ISeason>>(new Map());
  const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map());

  useEffect(()=>{
    setGroupMap(new Map(groups?.map((group)=>[group._id, group])));
  }, [groups]);

  useEffect(()=>{
    setSeasonMap(new Map(seasons?.map((season)=>[season._id, season])));
  }, [seasons]);

  useEffect(()=>{
    setLanguageMap(new Map(languages?.map((language)=>[language._id, language])));
  }, [languages]);

  useEffect(()=>{

    getLanguages(get_languages);
    getSeasons(get_seasons);
    getGroups(get_groups);
    getLessons(get_lessons);
    
  }, [])

  useEffect(()=>{
    setPath("lessons")
  }, [])

  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Update Lesson</h2>

      <ListDisplay
        data={lessons}
        error={error}
        loading={loading}
        renderItem={(lesson)=>{
          const group = groupMap.get(lesson.group_id)
          const groupName = group?.title;
          const season = seasonMap.get(group?.season_id || "No Season");
          const seasonName = season?.title;
          const language = languageMap.get(season?.language_id || "");
          const languageName = language?.title;
          return <LessonCard
                    title={lesson.lesson_type}
                    group={groupName} 
                    season={seasonName}
                    language={languageName}
                    handleClick={()=>navigate("view?id="+lesson._id)}
                    />
        }}
        emptyMessage="No Lessons Found!"
        className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll items-start"
      />
    </section>
  )
}
