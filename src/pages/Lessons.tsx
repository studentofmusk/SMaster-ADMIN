import { useEffect, useState } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, LessonCard } from "../components/Tools";
import { defaultGroups, defaultLessons } from "./default";
import { IGroup } from "./Groups";

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


export default function Lessons({setPath}:{setPath:(path: string)=>any}) {

  const handleClick = ()=>{}

  const [lessons, setLessons] = useState<ILesson[]>(defaultLessons)
  const [groups, setGroups] = useState<IGroup[]>(defaultGroups)

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

      <div className="mt-5 flex flex-wrap space-x-2 space-y-2">
        {
          lessons.map((lesson)=>(
            <LessonCard title={lesson.lesson_type} subtitle={groups.filter((group)=>group._id == lesson.group_id)?.[0].title} handleClick={handleClick}/>
          ))
        }
      </div>
    </section>
  )
}
