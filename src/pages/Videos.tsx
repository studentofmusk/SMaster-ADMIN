import { useEffect, useState } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, ListDisplay, VideoCard } from "../components/Tools";
import { useAPI } from "../hooks/useAPI";
import { get_videos } from "../utils/apis";

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
  const {data: videos, loading, error, fetchAPI} = useAPI<IVideo[]>();


  useEffect(()=>{
    setPath("videos");
  }, []);

  useEffect(()=>{
    fetchAPI(get_videos);
  }, [])



  return (
    <section className="px-10 h-[85vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">videos</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/videos/create" />
        <Card label="delete" src={trash} to="/videos/delete" />
      </div>

      <ListDisplay
        loading={loading}
        error={error}
        data={videos}
        renderItem={(video) => (
          <VideoCard
            key={video._id}
            title={video.title}
            url={video.url}
            audio={video.audio}
            action_id={video.action_id}
            thumbnail={video.thumbnail}
          />
        )}
        emptyMessage="No videos available."
        className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll"
      />
    </section>
  )
}
