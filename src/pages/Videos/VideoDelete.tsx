import { useEffect, useState } from "react"
import {ListDisplay, VideoCardDelete } from "../../components/Tools";
import { IVideo } from "../Videos";
import { useAPI } from "../../hooks/useAPI";
import { delete_video, get_videos } from "../../utils/apis";


export default function VideoDelete({setPath}:{setPath:(path: string)=>any}) {
  const {data: videos, loading, error, fetchAPI} = useAPI<IVideo[]>();
  const {fetchAPI: deleteVideoAPI} = useAPI<IVideo>();
  
  useEffect(()=>{
    fetchAPI(get_videos)
  }, []);

  const handleDelete = async(id:string)=>{
    try {
      const response = await deleteVideoAPI(delete_video, "POST", {video_id:id});
      if(!response.success) alert(response.message);

    } catch (error) {
      alert("Something went wrong!");
    }finally{
      fetchAPI(get_videos)
    }
  }


  useEffect(()=>{
    setPath("videos")
  }, []);

  return (
    <section className="h-[85vh] px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">video delete</h2>

      <ListDisplay
              loading={loading}
              error={error}
              data={videos}
              renderItem={(video) => (
                <VideoCardDelete
                  key={video._id}
                  title={video.title}
                  url={video.url}
                  audio={video.audio}
                  action_id={video.action_id}
                  thumbnail={video.thumbnail}
                  handleDelete={()=>handleDelete(video._id)}
                />
              )}
              emptyMessage="No videos available."
              className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll"
            />
    </section>
  )
}
