import { useEffect, useState } from "react"
import { useAPI } from "../../hooks/useAPI";
import { IVideo } from "../Videos";
import { create_video } from "../../utils/apis";


export default function VideoCreate({setPath}:{setPath:(path: string)=>any}) {
  const {fetchAPI, loading} = useAPI<IVideo>();

  const [title, setTitle] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [actionId, setActionId] = useState("");

  const [audioPreview, setAudioPreview] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !video || !thumbnail || !audio || !actionId) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);
    formData.append("audio", audio);
    formData.append("action_id", actionId);
    try {
      const response = await fetchAPI(create_video, "POST", formData)
      if(response.success){
        alert("Video uploaded successfully!");
        // Reset form after successful upload
        setTitle("");
        setVideo(null);
        setThumbnail(null);
        setAudio(null);
        setActionId("");
      }else{
        alert(response.message);
        console.log(response.errors);
        
      }
    } catch (error) {
      alert("Something went wrong!");
    }

  };

  useEffect(()=>{
    setPath("videos")
  }, []);

    useEffect(() => {
      if (audio) {
        const audioURL = URL.createObjectURL(audio);
        setAudioPreview(audioURL);
        
        return () => URL.revokeObjectURL(audioURL); // Cleanup URL
      } else {
        setAudioPreview(null);
      }
    }, [audio]);
  return (
    <section className="h-[85vh] px-10 overflow-y-scroll pl-20">
      <h2 className="text-[#EB5A3C] uppercase font-bold">create video</h2>
      
      <div className="mt-10 ml-4 space-x-4 space-y-4">
        {/* Title */}
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Title</h1>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="e.g Hello" className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]" />
        </div>

        {/* Video */}
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Video</h1>
          
          {video
              ?<div>
                <video src={URL.createObjectURL(video)} controls className="w-72 h-40 object-cover" />
                <div onClick={()=>setVideo(null)} className="ml-auto text-red-500 cursor-pointer">Cancel</div>
              </div>

              :<label htmlFor="video" className="bg-[#EB5A3C] text-white p-2 w-40 text-center uppercase" >Upload</label>
          }
          <input type="file" id="video" accept="video/mp4" onChange={(e)=>handleFileChange(e, setVideo)} className="hidden"/>
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Thumbnail</h1>
          
          {thumbnail
              ?<div>
                <img src={URL.createObjectURL(thumbnail)} className="w-72 h-40 object-cover" />
                <div onClick={()=>setThumbnail(null)} className="ml-auto text-red-500 cursor-pointer">Cancel</div>
              </div>

              :<label htmlFor="thumbnail" className="bg-[#EB5A3C] text-white p-2 w-40 text-center uppercase" >Upload</label>
          }
          <input type="file" accept="image/*" id="thumbnail" onChange={(e)=>handleFileChange(e, setThumbnail)} className="hidden"/>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Audio</h1>
          
          {audio ? (
              <div>
                <audio src={audioPreview ?? undefined} controls/>
                <div onClick={() => setAudio(null)} className="ml-auto text-red-500 cursor-pointer">Cancel</div>
              </div>
            ) : (
              <label htmlFor="audio" className="bg-[#EB5A3C] text-white p-2 w-40 text-center uppercase">
                Upload
              </label>
          )}
          
          <input type="file" id="audio" accept="audio/*" onChange={(e) => handleFileChange(e, setAudio)} className="hidden"/>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-[#665C5C] font-bold">Action ID</h1>
          <input type="number" value={actionId} onChange={(e)=>setActionId(e.target.value)} placeholder="e.g 1" className="border border-[#EB5A3C] rounded-xs w-72 h-10 pl-4 text-[#EB5A3C]"/>
        </div>

        <button disabled={loading} onClick={handleSubmit} className="text-xl uppercase bg-green-500 text-white px-10 py-1">Create</button>

      </div>
    </section>
  )
}
