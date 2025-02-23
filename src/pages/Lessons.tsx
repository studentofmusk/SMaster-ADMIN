import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, LessonCard, ListDisplay } from "../components/Tools";
import { IGroup } from "./Groups";
import { useAPI } from "../hooks/useAPI";
import { get_groups, get_languages, get_lessons, get_seasons} from "../utils/apis";
import { ISeason } from "./Seasons";
import { ILanguage } from "./Languages";
// import { ILecture } from "./Lecture";
// import { IV2Text } from "./V2Text";
// import { IT2Video } from "./T2Video";
// import { IV2Action } from "./V2Action";
// import { IT2Action } from "./T2Action";
// import { IVideo } from "./Videos";

export interface ILesson {
  _id: string;
    total_xp: number;
    group_id: string;
    lesson_type: string;
    topics: {
        topic_type: string;
        topic_id: string;
        skippable: boolean;
        xp: number;
        _id: string;
    }[];
    __v: number;
}

export enum LessonType{
  LEARNING='LEARNING',  
  WARMUP='WARMUP',  
  EXERCISE='EXERCISE',
  FINISH='FINISH'
}

export enum TopicTypes{
  LECTURE="LECTURE",
  V2TEXT="VIDEO_TO_TEXT",
  T2VIDEO="TEXT_TO_VIDEO",
  V2ACTION="VIDEO_TO_ACTION",
  T2ACTION="TEXT_TO_ACTION"
}


export default function Lessons({setPath}:{setPath:(path: string)=>any}) {
  const {data: lessons, fetchAPI: getLessons, loading, error} = useAPI<ILesson[]>()
  const {data: groups, fetchAPI: getGroups} = useAPI<IGroup[]>();
  const {data: seasons, fetchAPI: getSeasons} = useAPI<ISeason[]>();
  const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();
  const navigate = useNavigate();

  // Maps
  const [groupMap, setGroupMap] = useState<Map<string, IGroup>>(new Map());
  const [seasonMap, setSeasonMap] = useState<Map<string, ISeason>>(new Map());
  const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map());
  
  const handleClick = (id: string)=>{
    navigate("/lessons/view?id="+id);
  }

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
      <h2 className="text-[#EB5A3C] uppercase font-bold">Lessons</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/lessons/create" />
        <Card label="delete" src={trash} to="/lessons/delete" />
      </div>

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
                    handleClick={()=>handleClick(lesson._id)}/>
        }}
        emptyMessage="No Lessons Found!"
        className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll items-start"
      />
    </section>
  )
}
