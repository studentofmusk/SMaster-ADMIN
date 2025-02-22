import { useEffect, useState } from "react"
import { useAPI } from "../../hooks/useAPI";
import { create_lecture, create_v2text, get_videos } from "../../utils/apis";
import { IVideo } from "../Videos";
import { IV2Text } from "../V2Text";



export default function V2TextCreate({setPath}:{setPath:(path: string)=>any}) {
    const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>()
    const {fetchAPI: createV2Text} = useAPI<IV2Text[]>()
    const [title, setTitle] = useState("")
    const [options, setOptions] = useState(["", "", "", ""])

    const [videoId, setVideoId] = useState("");
    const [video, setVideo] = useState<IVideo>();

    
    useEffect(()=>{
        setVideo(videos?.find((video)=>video._id === videoId))
    }, [videoId])

    useEffect(()=>{
        getVideos(get_videos)
    }, []);

    useEffect(()=>{
        setPath("v2text")
    }, []);


  const handleSubmit = async()=>{
    try {
        console.log(title, videoId, options);
        
        if(!title || !videoId || !options || !(options.length === 4)) return alert("Please full fill the requirements")
        const response = await createV2Text(create_v2text, "POST", {
            title, video:videoId, options
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
    <section className="px-10 h-[85vh] overflow-y-scroll">
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
        {video?
            <>
                <div className="flex flex-col space-y-2">
                    <h1 className="uppercase text-[#665C5C] font-bold">option 1</h1>
                    <select value={options[0]} onChange={(e) => setOptions(options.map((opt, idx) => idx === 0 ? e.target.value : opt))} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
                        <option value="">SELECT</option>
                        <option value={video.title}>{video.title}</option>
                    </select>
                </div>
                
                <div className="flex flex-col space-y-2">
                    <h1 className="uppercase text-[#665C5C] font-bold">option 2</h1>
                    <input type="text" placeholder="Create your own option" value={options[1]} onChange={(e) => setOptions(options.map((opt, idx) => idx === 1 ? e.target.value : opt))} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" ></input>
                </div>
                
                <div className="flex flex-col space-y-2">
                    <h1 className="uppercase text-[#665C5C] font-bold">option 3</h1>
                    <input type="text" placeholder="Create your own option" value={options[2]} onChange={(e) => setOptions(options.map((opt, idx) => idx === 2 ? e.target.value : opt))} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" ></input>
                </div>

                <div className="flex flex-col space-y-2">
                    <h1 className="uppercase text-[#665C5C] font-bold">option 4</h1>
                    <input type="text" placeholder="Create your own option" value={options[3]} onChange={(e) => setOptions(options.map((opt, idx) => idx === 3 ? e.target.value : opt))} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" ></input>
                </div>
                
                
            </>
            :""
            }

        <button onClick={handleSubmit} className="text-xl uppercase bg-green-500 text-white px-10 py-1">Create</button>

      </div>
    </section>
  )
}
