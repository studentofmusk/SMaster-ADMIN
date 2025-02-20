import { useEffect, useState } from "react"
import {ListDisplay, SeasonCardDelete } from "../../components/Tools";
import { ISeason } from "../Seasons";
import { useAPI } from "../../hooks/useAPI";
import { get_seasons } from "../../utils/apis";


export default function SeasonDelete({setPath}:{setPath:(path: string)=>any}) {
  
    const {data: seasons, fetchAPI, error, loading} = useAPI<ISeason[]>();

  useEffect(()=>{
    setPath("seasons")
  }, []);

  useEffect(()=>{
    fetchAPI(get_seasons);
  }, []);

  const handleDelete = async(id: string)=>{
    alert("Not Implemented yet!");
  }

  
  return (
    <section className="px-10 h-[85vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete Seasons</h2>

      <ListDisplay
        loading={loading}
        error={error}
        data={seasons}
        renderItem={(season)=>(<SeasonCardDelete title={season.title} handleClick={()=>handleDelete(season._id)} />)}
        emptyMessage="No seasons available."
        className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll"
      />
    </section>
  )
}
