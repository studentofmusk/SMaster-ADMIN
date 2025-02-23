import { useEffect } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, ListDisplay, T2ActionCard} from "../components/Tools";
import { IVideo } from "./Videos";
import { useAPI } from "../hooks/useAPI";
import { get_t2action, get_videos } from "../utils/apis";

export interface IT2Action{
  _id: string;
  title: string;
  video: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function T2Action({setPath}:{setPath:(path: string)=>any}) {
  const {data: t2actions, fetchAPI: getT2Actions, loading, error} = useAPI<IT2Action[]>();
  const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>();
  
  
  const handleClick = ()=>{

  }

  useEffect(()=>{
    getVideos(get_videos);
    getT2Actions(get_t2action);
  }, []);

  useEffect(()=>{
    setPath("t2action")
  }, []);

  return (
    <section className="px-10 h-[85vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">T2Actions</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/t2action/create" />
        <Card label="delete" src={trash} to="/t2action/delete" />
      </div>

      <ListDisplay
        data={t2actions}
        error={error}
        loading={loading}
        renderItem={(v2action)=>{
            const VIDEO = videos?.find((video)=>video._id === v2action.video);
            return (
                <>{VIDEO
                    ?<T2ActionCard  
                        title={v2action.title}
                        action_id={VIDEO.action_id}
                        />
                    :<></>
                }
                
                </>
            )
        }}
        emptyMessage="No T2Video Not Found!" 
        className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll items-start"    
    />
    </section>
  )
}
