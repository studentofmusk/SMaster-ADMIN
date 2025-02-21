import { useEffect } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card, LectureCard, ListDisplay} from "../components/Tools";
import { useAPI } from "../hooks/useAPI";
import { get_lectures, get_videos } from "../utils/apis";
import { IVideo } from "./Videos";

export interface ILecture{
    _id: string;
    title: string;
    video: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function Lecture({setPath}:{setPath:(path: string)=>any}) {
    const {data: lectures, fetchAPI, loading, error} = useAPI<ILecture[]>();
    const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>();
  const handleClick = ()=>{

  }

  useEffect(()=>{
    getVideos(get_videos);
    fetchAPI(get_lectures);
  }, [])

  useEffect(()=>{
    setPath("lecture")
  }, []);

  return (
    <section className="px-10 h-[85vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Lectures</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/lecture/create" />
        <Card label="delete" src={trash} to="/lecture/delete" />
      </div>

        <ListDisplay
            data={lectures}
            error={error}
            loading={loading}
            renderItem={(lecture)=>{
                const VIDEO = videos?.find((video)=>video._id === lecture.video);
                return (
                    <>{VIDEO
                        ?<LectureCard  
                            title={lecture.title}
                            url={VIDEO.url}
                            thumbnail={VIDEO.thumbnail}
                            audio={VIDEO.audio}
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
