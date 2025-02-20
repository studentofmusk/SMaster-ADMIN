import { useEffect, useState } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, ListDisplay, SeasonCard } from "../components/Tools";
import { defaultLanguages, defaultSeasons } from "./default";
import { useAPI } from "../hooks/useAPI";
import { get_seasons } from "../utils/apis";

export interface ISeason {
  _id: string;
  title: string;
  language_id: string;
  groups: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Seasons({setPath}:{setPath:(path: string)=>any}) {
  const {data: seasons, fetchAPI, error, loading} = useAPI<ISeason[]>();
  const [languages, setLanguages] = useState(defaultLanguages)

  const handleClick = ()=>{

  }

  useEffect(()=>{
    setPath("seasons")
  }, []);

  useEffect(()=>{
    fetchAPI(get_seasons);
  }, [])
  return (
    <section className="px-10 h-[85vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Seasons</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/seasons/create" />
        <Card label="delete" src={trash} to="/seasons/delete" />
      </div>

      <ListDisplay
        loading={loading}
        error={error}
        data={seasons}
        renderItem={(season) => <SeasonCard title={season.title} handleClick={handleClick} />}
        emptyMessage="No seasons available."
        className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll"
      />
    </section>
  )
}
