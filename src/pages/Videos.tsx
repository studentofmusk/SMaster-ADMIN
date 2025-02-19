import { useEffect, useState } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, VideoCard } from "../components/Tools";
import { defaultVideos } from "./default";

export interface IVideo {
  _id: string;
  title: string;
  url: string;
  thumbnail: string;
  audio: string;
  action_id: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Videos({setPath}:{setPath:(path: string)=>any}) {
  const [videos, setVideos] = useState<IVideo[]>(defaultVideos)


  useEffect(()=>{
    setPath("videos")
  }, []);

  return (
    <section className="px-10 overflow-y-scroll">
      <h2 className="text-[#EB5A3C] uppercase font-bold">videos</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/videos/create" />
        <Card label="delete" src={trash} to="/videos/delete" />
      </div>

      <div className="mt-10 ml-4 space-x-4 space-y-4  flex flex-wrap">
      {
        videos.map((video)=>(
          <VideoCard 
            title={video.title} 
            url={video.url} 
            audio={video.audio} 
            action_id={video.action_id} 
            thumbnail={video.thumbnail} 
          />
        ))
      }
      </div>
    </section>
  )
}
