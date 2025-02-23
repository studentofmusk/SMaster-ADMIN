import { useEffect, useState } from "react"
import { useAPI } from "../../hooks/useAPI";
import { create_t2video, create_v2text, get_videos } from "../../utils/apis";
import { IVideo } from "../Videos";
import { IV2Text } from "../V2Text";



export default function T2VideoCreate({setPath}:{setPath:(path: string)=>any}) {
    const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>()
    const {fetchAPI: createV2Text} = useAPI<IV2Text[]>()
    const [title, setTitle] = useState("")
    const [option_1, setOption_1] = useState("");
    const [option_2, setOption_2] = useState("");
    const [option_3, setOption_3] = useState("");
    const [option_4, setOption_4] = useState("");

    useEffect(()=>{
        getVideos(get_videos)
    }, []);

    useEffect(()=>{
        setPath("t2video")
    }, []);


  const handleSubmit = async()=>{
    try {
        
        if(!title || !option_1 || !option_2 || !option_3 || !option_4) return alert("Please full fill the requirements")
        const response = await createV2Text(create_t2video, "POST", {
            title, options:[option_1, option_2, option_3, option_4]
        });

        if(response.success){
            alert("New T2Video created successfully!");
            setTitle("");
            setOption_1("");
            setOption_2("");
            setOption_3("");
            setOption_4("");
            
        }else{
            alert(response.message);
            console.log(response);
            
        }
    } catch (error) {
        alert("Something went wrong!");
    }
  }

  
  return (
    <section className="px-10 h-[85vh] overflow-y-scroll">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Create T2Video</h2>
      <div className="mt-10 ml-4 space-x-4 space-y-4">
        {/* Title */}
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Title</h1>
          <select value={title} onChange={(e)=>setTitle(e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
            <option value="">SELECT</option>
            {videos && videos.length >0?
                videos.map((video)=>(
                    <option value={video.title}>{video.title}</option>
                )):""
            }
          </select>
        </div>

        
    
        <div className="flex flex-col space-y-2">
            <h1 className="uppercase text-[#665C5C] font-bold">option 1</h1>
            <select value={option_1} onChange={(e) => setOption_1( e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
                <option value="">SELECT</option>
                {videos
                ? videos.filter((video)=>video.title === title).map((video)=><option value={video._id}>{video.title}</option>)
                :""
                }
                
            </select>
        </div>
        <div className="flex flex-col space-y-2">
            <h1 className="uppercase text-[#665C5C] font-bold">option 2</h1>
            <select value={option_2} onChange={(e) => setOption_2( e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
                <option value="">SELECT</option>
                {videos
                ? videos.filter((video)=>![option_1, option_3, option_4].includes(video._id)).map((video)=><option value={video._id}>{video.title}</option>)
                :""
                }
                
            </select>
        </div>
        <div className="flex flex-col space-y-2">
            <h1 className="uppercase text-[#665C5C] font-bold">option 3</h1>
            <select value={option_3} onChange={(e) => setOption_3( e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
                <option value="">SELECT</option>
                {videos
                ? videos.filter((video)=>![option_1, option_2, option_4].includes(video._id)).map((video)=><option value={video._id}>{video.title}</option>)
                :""
                }
                
            </select>
        </div>
        <div className="flex flex-col space-y-2">
            <h1 className="uppercase text-[#665C5C] font-bold">option 4</h1>
            <select value={option_4} onChange={(e) => setOption_4( e.target.value)} className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" >
                <option value="">SELECT</option>
                {videos
                ? videos.filter((video)=>![option_1, option_2, option_3].includes(video._id)).map((video)=><option value={video._id}>{video.title}</option>)
                :""
                }
                
            </select>
        </div>
        
        <button onClick={handleSubmit} className="text-xl uppercase bg-green-500 text-white px-10 py-1">Create</button>
      
        
                
            


      </div>
    </section>
  )
}
