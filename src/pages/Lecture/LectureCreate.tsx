import { useEffect, useState } from "react"
import { useAPI } from "../../hooks/useAPI";
import { create_lecture, get_videos } from "../../utils/apis";
import { IVideo } from "../Videos";
import { ILecture } from "../Lecture";



export default function LectureCreate({setPath}:{setPath:(path: string)=>any}) {
    const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>()
    const {fetchAPI: createLecture} = useAPI<ILecture[]>()
    const [title, setTitle] = useState("")

    const [videoId, setVideoId] = useState("");

    useEffect(()=>{
        getVideos(get_videos)
    }, []);

    useEffect(()=>{
        setPath("lecture")
    }, []);


  const handleSubmit = async()=>{
    try {
        if(!title || !videoId) return alert("Please full fill the requirements")
        const response = await createLecture(create_lecture, "POST", {
            title, video:videoId
        })
        if(response.success){
            alert("New Lecture created successfully!");
        }else{
            alert(response.message);
        }
    } catch (error) {
        alert("Something went wrong!");
    }
  }

  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Create Lecture</h2>
      <div className="mt-10 ml-4 space-x-4 space-y-4">
        {/* Title */}
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Title</h1>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="e.g Come on" className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" />
        </div>

        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Video</h1>
          <select value={videoId} onChange={(e)=>setVideoId(e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
            <option value="">SELECT</option>
            {videos && videos.length >0?
                videos.map((video)=>(
                    <option value={video._id}>{video.title}</option>
                )):""
            }
          </select>
        </div>

        <button onClick={handleSubmit} className="text-xl uppercase bg-green-500 text-white px-10 py-1">Create</button>

      </div>
    </section>
  )
}
