import { useEffect } from "react"
import { ListDisplay, T2VideoCardDelete} from "../../components/Tools";
import { useAPI } from "../../hooks/useAPI";
import { delete_t2video, get_t2video, get_videos } from "../../utils/apis";
import { IVideo } from "../Videos";
import { IT2Video } from "../T2Video";


export default function T2VideoDelete({setPath}:{setPath:(path: string)=>any}) {
  const {data:t2videos, fetchAPI:getT2Video, loading, error} = useAPI<IT2Video[]>();
  const {data:videos, fetchAPI:getVideos} = useAPI<IVideo []>();
  const { fetchAPI:deleteT2Video} = useAPI<IT2Video []>();
  
  const handleDelete = async(id: string, title:string)=>{
    try {
      const response = await deleteT2Video(delete_t2video, "POST", {
        t2video_id:id
      });

      if(response.success){
        alert(`T2Video [${title}] is deleted!`);
        await getT2Video(get_t2video);
      }else{
        alert(response.message);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
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
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete T2Video</h2>

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
                  <T2VideoCardDelete
                    title={t2video.title}
                    options={[VIDEO_1, VIDEO_2, VIDEO_3, VIDEO_4]}
                    handleDelete={()=>handleDelete(t2video._id, t2video.title)}
                    />
              );
          }}
          emptyMessage="No T2Video Found!" 
          className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll items-start"    
      />
    </section>
  )
}
