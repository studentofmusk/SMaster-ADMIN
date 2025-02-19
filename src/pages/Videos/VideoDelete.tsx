import { useEffect, useState } from "react"
import {VideoCardDelete } from "../../components/Tools";
import { IVideo } from "../Videos";
import { defaultVideos } from "../default";


export default function VideoDelete({setPath}:{setPath:(path: string)=>any}) {
  const [videos, setVideos] = useState<IVideo[]>(defaultVideos)

  const handleDelete = ()=>{
    // Impliment delete
  }


  useEffect(()=>{
    setPath("videos")
  }, []);

  return (
    <section className="px-10 overflow-y-scroll">
      <h2 className="text-[#EB5A3C] uppercase font-bold">video delete</h2>

      <div className="mt-10 ml-4 space-x-4 space-y-4  flex flex-wrap">
      {
        videos.map((video)=>(
          <VideoCardDelete 
            title={video.title} 
            url={video.url} 
            audio={video.audio} 
            action_id={video.action_id} 
            thumbnail={video.thumbnail} 
            handleDelete={handleDelete}
          />
        ))
      }
      </div>
    </section>
  )
}
