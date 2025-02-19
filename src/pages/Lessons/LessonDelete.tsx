import { useEffect, useState } from "react"
import {LessonCardDelete } from "../../components/Tools";
import { defaultGroups, defaultLessons} from "../default";
import { ILesson } from "../Lessons";
import { IGroup } from "../Groups";


export default function LessonDelete({setPath}:{setPath:(path: string)=>any}) {

  const [lessons, setLessons] = useState<ILesson[]>(defaultLessons);
  const [groups, setGroups] = useState<IGroup[]>(defaultGroups);

  useEffect(()=>{
    setPath("lessons")
  }, []);

  const handleClick = ()=>{
    alert("Clicked")
  }

  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete Groups</h2>

      <div className="mt-5 flex flex-wrap space-x-2 space-y-2">
        {
          lessons.map((lesson)=>(
            <LessonCardDelete title={lesson.lesson_type} subtitle={groups.filter((group)=>group._id == lesson.group_id)?.[0].title} handleClick={handleClick} />
          ))
        }
      </div>
    </section>
  )
}
