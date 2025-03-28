import { useEffect } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, ListDisplay, V2ActionCard} from "../components/Tools";
import { useAPI } from "../hooks/useAPI";
import { get_v2action, get_videos } from "../utils/apis";
import { IVideo } from "./Videos";

export interface IV2Action{
  _id: string;
  title: string;
  video: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function V2Action({setPath}:{setPath:(path: string)=>any}) {
  const {data: v2actions, fetchAPI: getV2Actions, loading, error} = useAPI<IV2Action[]>();
  const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>()
  
  const handleClick = ()=>{

  }

  useEffect(()=>{
    getVideos(get_videos);
    getV2Actions(get_v2action);
  }, []);

  useEffect(()=>{
    setPath("v2action")
  }, []);

  return (
    <section className="px-10 h-[85vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">V2Action</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/v2action/create" />
        <Card label="delete" src={trash} to="/v2action/delete" />
      </div>

      <ListDisplay
        data={v2actions}
        error={error}
        loading={loading}
        renderItem={(v2action)=>{
            const VIDEO = videos?.find((video)=>video._id === v2action.video);
            return (
                <>{VIDEO
                    ?<V2ActionCard  
                        title={v2action.title}
                        url={VIDEO.url}
                        thumbnail={VIDEO.thumbnail}
                        action_id={VIDEO.action_id}
                        />
                    :<></>
                }
                
                </>
            )
        }}
        emptyMessage="No Lecture Found!" 
        className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll items-start"    
    />

    </section>
  )
}
