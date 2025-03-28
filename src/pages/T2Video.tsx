import { useEffect } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, ListDisplay, T2VideoCard} from "../components/Tools";
import { useAPI } from "../hooks/useAPI";
import { get_t2video, get_videos } from "../utils/apis";
import { IVideo } from "./Videos";

export interface IT2Video {
  _id: string;
  title: string;
  options: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function T2Video({setPath}:{setPath:(path: string)=>any}) {
  const {data:t2videos, fetchAPI:getT2Video, loading, error} = useAPI<IT2Video[]>();
  const {data:videos, fetchAPI:getVideos} = useAPI<IVideo []>();

  
  const handleClick = ()=>{

  }

  useEffect(()=>{
    getT2Video(get_t2video);
    getVideos(get_videos);
  }, []);
  

  useEffect(()=>{
    setPath("t2video")
  }, []);

  return (
    <section className="px-10 h-[85vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">T2Video</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/t2video/create" />
        <Card label="delete" src={trash} to="/t2video/delete" />
      </div>

      <ListDisplay
          data={t2videos}
          error={error}
          loading={loading}
          renderItem={(t2video)=>{
              const VIDEO_1 = videos?.find((video)=>video._id === t2video.options[0]);
              const VIDEO_2 = videos?.find((video)=>video._id === t2video.options[1]);
              const VIDEO_3 = videos?.find((video)=>video._id === t2video.options[2]);
              const VIDEO_4 = videos?.find((video)=>video._id === t2video.options[3]);
              return (
                  <T2VideoCard  
                    title={t2video.title}
                    options={[VIDEO_1, VIDEO_2, VIDEO_3, VIDEO_4]}
                    />
              );
          }}
          emptyMessage="No T2Video Found!" 
          className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll items-start"    
      />
    </section>
  )
}
