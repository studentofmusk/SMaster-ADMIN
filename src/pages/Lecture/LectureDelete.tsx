import { useEffect } from "react"

// Icons
import { LectureCardDelete, ListDisplay} from "../../components/Tools";
import { useAPI } from "../../hooks/useAPI";
import { delete_lecture, get_lectures, get_videos } from "../../utils/apis";
import { IVideo } from "../Videos";
import { ILecture } from "../Lecture";

export default function LectureDelete({setPath}:{setPath:(path: string)=>any}) {
    const {data: lectures, fetchAPI, loading, error} = useAPI<ILecture[]>();
    const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>();
    const {fetchAPI:deleteLecture} = useAPI<ILecture>(); 
    const handleDelete = async(id: string, title: string)=>{
        try {
            const response = await deleteLecture(delete_lecture, "POST", {lecture_id:id});
            if(response.success){
                alert(`Lecture[${title}] is deleted successfully!`);
            }else{
                alert(response.message);
            }
        } catch (error) {
            alert("Something went wrong!");
        }
        finally{
            await fetchAPI(get_lectures);
        }
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
        <h2 className="text-[#EB5A3C] uppercase font-bold">Delete Lectures</h2>

            <ListDisplay
                data={lectures}
                error={error}
                loading={loading}
                renderItem={(lecture)=>{
                    const VIDEO = videos?.find((video)=>video._id === lecture.video);
                    return (
                        <>{VIDEO
                            ?<LectureCardDelete  
                                title={lecture.title}
                                url={VIDEO.url}
                                thumbnail={VIDEO.thumbnail}
                                audio={VIDEO.audio}
                                handleDelete={()=>handleDelete(lecture._id, lecture.title)}
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
