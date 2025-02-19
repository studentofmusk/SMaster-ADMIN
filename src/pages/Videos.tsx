import { useEffect, useState } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, VideoCard } from "../components/Tools";

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
  const [videos, setVideos] = useState<IVideo[]>([
    {
      "_id": "67af23f8a558632741a46916",
      "title": "hello",
      "url": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739531255894-video_1.mp4",
      "thumbnail": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739531255896-thumbnail_1.png",
      "audio": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739531255901-audio_1.mp3",
      "action_id": 1,
      "createdAt": "2025-02-14T11:07:36.236Z",
      "updatedAt": "2025-02-14T11:07:36.236Z",
      "__v": 0
    },
    {
      "_id": "67af5b31f93805f24596adaa",
      "title": "hello_2",
      "url": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545392778-video_1.mp4",
      "thumbnail": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545392788-thumbnail_1.png",
      "audio": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545392786-audio_1.mp3",
      "action_id": 1,
      "createdAt": "2025-02-14T15:03:13.225Z",
      "updatedAt": "2025-02-14T15:03:13.225Z",
      "__v": 0
    },
    {
      "_id": "67af5b35f93805f24596adad",
      "title": "hello_3",
      "url": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545397377-video_1.mp4",
      "thumbnail": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545397380-thumbnail_1.png",
      "audio": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545397379-audio_1.mp3",
      "action_id": 1,
      "createdAt": "2025-02-14T15:03:17.602Z",
      "updatedAt": "2025-02-14T15:03:17.602Z",
      "__v": 0
    },
    {
      "_id": "67af5b3af93805f24596adb0",
      "title": "hello_4",
      "url": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545402057-video_1.mp4",
      "thumbnail": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545402059-thumbnail_1.png",
      "audio": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545402059-audio_1.mp3",
      "action_id": 1,
      "createdAt": "2025-02-14T15:03:22.256Z",
      "updatedAt": "2025-02-14T15:03:22.256Z",
      "__v": 0
    }
  ])


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
