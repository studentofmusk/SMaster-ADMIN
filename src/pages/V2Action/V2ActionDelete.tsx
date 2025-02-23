import { useEffect } from "react"

import { ListDisplay, V2ActionCardDelete} from "../../components/Tools";
import { useAPI } from "../../hooks/useAPI";
import { delete_v2action, get_v2action, get_videos } from "../../utils/apis";
import { IVideo } from "../Videos";
import { IV2Action } from "../V2Action";


export default function V2ActionDelete({setPath}:{setPath:(path: string)=>any}) {
  const {data: v2actions, fetchAPI: getV2Actions, loading, error} = useAPI<IV2Action[]>();
  const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>()
  const {fetchAPI: deleteV2Action} = useAPI<IV2Action>();
  
  const handleDelete = async(id: string, title: string)=>{
    try {
        const response = await deleteV2Action(delete_v2action, "POST", {v2action_id: id});
        if(response.success){
            alert(`V2Action [${title}] is deleted!`)
            await getV2Actions(get_v2action);
        }else{
            alert(response.message);
        }
    } catch (error) {
        alert("Something went wrong!");
    }

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
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete V2Action</h2>
      <ListDisplay
        data={v2actions}
        error={error}
        loading={loading}
        renderItem={(v2action)=>{
            const VIDEO = videos?.find((video)=>video._id === v2action.video);
            return (
                <>{VIDEO
                    ?<V2ActionCardDelete  
                        title={v2action.title}
                        url={VIDEO.url}
                        thumbnail={VIDEO.thumbnail}
                        action_id={VIDEO.action_id}
                        handleDelete={()=>handleDelete(v2action._id, v2action.title)}
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
