import { useEffect, useState } from "react"
import {GroupCardDelete } from "../../components/Tools";
import { defaultGroups} from "../default";


export default function GroupDelete({setPath}:{setPath:(path: string)=>any}) {

  const [groups, setGroups] = useState(defaultGroups)

  useEffect(()=>{
    setPath("groups")
  }, []);

  const handleClick = ()=>{
    alert("Clicked")
  }

  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete Groups</h2>

      <div className="mt-5 flex flex-wrap space-x-2 space-y-2">
        {
          groups.map((group)=>(
            <GroupCardDelete title={group.title} handleClick={handleClick} />
          ))
        }
      </div>
    </section>
  )
}
