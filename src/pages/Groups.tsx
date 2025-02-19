import { useEffect, useState } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card } from "../components/Tools";
import { defaultGroups } from "./default";

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
  const [groups, setGroups] = useState<IGroup[]>(defaultGroups)
  useEffect(()=>{
    setPath("groups")
  }, [])
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Groups</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/groups/create" />
        <Card label="delete" src={trash} to="/groups/delete" />
      </div>
    </section>
  )
}
