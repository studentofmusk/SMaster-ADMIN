import { useEffect, useState } from "react"
import { defaultGroups, defaultLanguages, defaultSeasons } from "../default";
import { ISeason } from "../Seasons";
import { ILanguage } from "../Languages";
import { IGroup } from "../Groups";
import { LessonType } from "../Lessons";


export default function LessonCreate({setPath}:{setPath:(path: string)=>any}) {
    const [lessonType, setLessonType] = useState<LessonType>(LessonType.LEARNING);

    const [languageId, setLanguageId] = useState("")
    const [languages, setLanguages] = useState<ILanguage[]>(defaultLanguages);

    const [seasonId, setSeasonId] = useState("")
    const [seasons, setSeasons] = useState<ISeason[]>(defaultSeasons);
    
    const [groupId, setGroupId] = useState("")
    const [groups, setGroups] = useState<IGroup[]>(defaultGroups);

    useEffect(()=>{
        setPath("lessons")
    }, []);


  const handleClick = ()=>{

  }

  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Create Lesson</h2>
      <div className="mt-10 ml-4 space-x-4 space-y-4">
        {/* Lesson Type */}
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Lesson Type</h1>
          <select value={lessonType} onChange={(e)=>setLessonType(e.target.value as LessonType)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
            <option value={LessonType.LEARNING}>{LessonType.LEARNING}</option>
            <option value={LessonType.WARMUP}>{LessonType.WARMUP}</option>
            <option value={LessonType.EXERCISE}>{LessonType.EXERCISE}</option>
            <option value={LessonType.FINISH}>{LessonType.FINISH}</option>
                
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Language</h1>
          <select value={languageId} onChange={(e)=>setLanguageId(e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
            <option value="">SELECT</option>
            {
                languages.map((language)=>(
                    <option value={language._id}>{language.title}</option>
                ))
            }
          </select>
        </div>
        
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Season</h1>
          <select value={seasonId} onChange={(e)=>setSeasonId(e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
            <option value="">SELECT</option>
            {
                seasons.filter((season)=>season.language_id === languageId).map((season)=>(
                    <option value={season._id}>{season.title}</option>
                ))
            }
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Group</h1>
          <select value={groupId} onChange={(e)=>setGroupId(e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
            <option value="">SELECT</option>
            {
                groups.filter((group)=>group.season_id === seasonId).map((season)=>(
                    <option value={season._id}>{season.title}</option>
                ))
            }
          </select>
        </div>

        <button className="text-xl uppercase bg-green-500 text-white px-10 py-1">Create</button>

      </div>
    </section>
  )
}
