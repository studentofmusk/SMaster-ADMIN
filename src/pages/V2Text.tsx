import { useEffect } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, ListDisplay, V2TextCard} from "../components/Tools";
import { IVideo } from "./Videos";
import { useAPI } from "../hooks/useAPI";
import { get_v2text, get_videos } from "../utils/apis";

export interface IV2Text {
  _id: string;
  title: string;
  video: string;
  options: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function V2Text({setPath}:{setPath:(path: string)=>any}) {
  
  const {data: v2texts, fetchAPI: getV2Text, loading, error} = useAPI<IV2Text[]>();
  const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>();

  const handleClick = ()=>{

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
      <h2 className="text-[#EB5A3C] uppercase font-bold">V2Texts</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/v2text/create" />
        <Card label="delete" src={trash} to="/v2text/delete" />
      </div>

      <ListDisplay
                  data={v2texts}
                  error={error}
                  loading={loading}
                  renderItem={(v2text)=>{
                      const VIDEO = videos?.find((video)=>video._id === v2text.video);
                      return (
                          <>{VIDEO
                              ?<V2TextCard  
                                  title={v2text.title}
                                  url={VIDEO.url}
                                  thumbnail={VIDEO.thumbnail}
                                  audio={VIDEO.audio}
                                  options={v2text.options}
                                  />
                              :<></>
                          }
                          
                          </>
                      )
                  }}
                  emptyMessage="No V2Text Found!" 
                  className="mt-10 ml-4 gap-4 h-[75%] overflow-y-scroll items-start"    
              />

    </section>
  )
}
