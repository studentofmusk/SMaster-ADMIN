import { useEffect } from "react"

import { ListDisplay, T2ActionCardDelete} from "../../components/Tools";
import { IVideo } from "../Videos";
import { useAPI } from "../../hooks/useAPI";
import { delete_t2action, get_t2action, get_v2action, get_videos } from "../../utils/apis";
import { IT2Action } from "../T2Action";

export default function T2ActionDelete({setPath}:{setPath:(path: string)=>any}) {
  const {data: t2actions, fetchAPI: getT2Actions, loading, error} = useAPI<IT2Action[]>();
  const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>();
  const {fetchAPI: deleteT2Action} = useAPI<IT2Action[]>();
  
  
  const handleDelete = async(id: string, title: string)=>{
      try {
          const response = await deleteT2Action(delete_t2action, "POST", {t2action_id: id});
          if(response.success){
              alert(`T2Action [${title}] is deleted!`)
              await getT2Actions(get_v2action);
          }else{
              alert(response.message);
          }
      } catch (error) {
          alert("Something went wrong!");
      }
  
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
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete T2Actions</h2>

      <ListDisplay
        data={t2actions}
        error={error}
        loading={loading}
        renderItem={(v2action)=>{
            const VIDEO = videos?.find((video)=>video._id === v2action.video);
            return (
                <>{VIDEO
                    ?<T2ActionCardDelete  
                        title={v2action.title}
                        action_id={VIDEO.action_id}
                        handleDelete={()=>handleDelete(v2action._id, v2action.title)}
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
