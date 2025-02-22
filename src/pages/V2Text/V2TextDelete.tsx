import { useEffect } from "react"
import { Card, ListDisplay, V2TextCard, V2TextCardDelete} from "../../components/Tools";
import { IVideo } from "../Videos";
import { useAPI } from "../../hooks/useAPI";
import { delete_v2text, get_v2text, get_videos } from "../../utils/apis";
import { IV2Text } from "../V2Text";


export default function V2TextDelete({setPath}:{setPath:(path: string)=>any}) {
  
  const {data: v2texts, fetchAPI: getV2Text, loading, error} = useAPI<IV2Text[]>();
  const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>();
  const {fetchAPI: deleteV2Text} = useAPI<IV2Text>();
  

  const handleDelete = async(id: string, title: string)=>{
    try {
        const response = await deleteV2Text(delete_v2text, "POST", {v2text_id:id});
        if(response.success){
            alert(`V2Text[${title}] is deleted successfully!`);
        }else{
            alert(response.message);
        }
    } catch (error) {
        alert("Something went wrong!");
    }
    finally{
        await getV2Text(get_v2text);
    }
  }

  useEffect(()=>{
    getV2Text(get_v2text);
    getVideos(get_videos);
  }, []);

  useEffect(()=>{
    setPath("v2text")
  }, []);

  return (
    <section className="px-10 h-[85vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete V2Text</h2>

      <ListDisplay
                  data={v2texts}
                  error={error}
                  loading={loading}
                  renderItem={(v2text)=>{
                      const VIDEO = videos?.find((video)=>video._id === v2text.video);
                      return (
                          <>{VIDEO
                              ?<V2TextCardDelete  
                                  title={v2text.title}
                                  url={VIDEO.url}
                                  thumbnail={VIDEO.thumbnail}
                                  audio={VIDEO.audio}
                                  options={v2text.options}
                                  handleDelete={()=>handleDelete(v2text._id, v2text.title)}
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
