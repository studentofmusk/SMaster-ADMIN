import { useRef, useState } from "react";
import { Link } from "react-router";

// Icons
import mini_play from "../images/utils/mini_play.png";
import mini_sound from "../images/utils/mini_sound.png";
import mini_trash from "../images/utils/mini_trash.png";

export const Card = ({label, src, to}:{[key:string]:string})=>(
    <Link to={to} className="py-7 px-10 flex items-center justify-center space-x-2 bg-[#DF9755] rounded-lg">
          <img src={src} className="w-10" />
          <div className="uppercase text-xl text-white font-bold">{label}</div>
    </Link>
  )

export const VideoCard = ({ title, url, audio, action_id, thumbnail,
  }: {
    title: string;
    url: string;
    audio: string;
    action_id: number;
    thumbnail: string;
  }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
  
    // Handle Audio Play/Pause
    const handleAudioToggle = () => {
      if (audioRef.current) {
        if (isAudioPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsAudioPlaying(!isAudioPlaying);
      }
    };
  
    return (
      <div className="w-60 h-72 bg-[#EB5A3C] rounded-lg p-3 shadow-lg text-white">
        {/* Video or Thumbnail */}
        <div className="relative w-full h-40 rounded overflow-hidden cursor-pointer">
          {isPlaying ? (
            <video
              src={url}
              className="w-full h-full object-cover"
              autoPlay
              onEnded={() => setIsPlaying(false)}
              onClick={() => setIsPlaying(false)}
            />
          ) : (
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-full h-full object-cover"
              onClick={() => setIsPlaying(true)}
            />
          )}
  
          {/* Play Button Overlay */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-cover"
              style={{ backgroundImage: `url(${thumbnail})` }}
              onClick={() => setIsPlaying(true)}
            >
              <img src={mini_play} alt="Play Icon" className="w-12 h-12" />
            </div>
          )}
        </div>
  
        {/* Details */}
        <div className="mt-3">
            <div className="mx-2 flex justify-between items-center">
                  <h3 className="text-gray-200 ">Title:</h3>
                  <div className="text-sm uppercase">{title}</div>
            </div>
            <div className="mx-2 flex justify-between items-center">
                  <h3 className="text-gray-200">Action ID:</h3>
                  <div className="text-sm uppercase">{action_id}</div>
            </div>
            <div className="mx-2 flex justify-between items-center">
                  <h3 className="text-gray-200">Audio:</h3>
                  {/* Audio Play Button */}
                  <button
                        onClick={handleAudioToggle}
                        className={`p-2 rounded-full ${isAudioPlaying ? "bg-green-500" : " bg-opacity-50"}`}
                  >
                        <img src={mini_sound} alt="Play Audio" className="w-6 h-6" />
                  </button>
            </div>
        </div>
  
        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={audio} onEnded={()=>setIsAudioPlaying(false)} />
      </div>
    );
  };


export const VideoCardDelete = ({ title, url, audio, action_id, thumbnail, handleDelete
  }: {
    title: string;
    url: string;
    audio: string;
    action_id: number;
    thumbnail: string;
    handleDelete: ()=>any
  }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
  
    // Handle Audio Play/Pause
    const handleAudioToggle = () => {
      if (audioRef.current) {
        if (isAudioPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsAudioPlaying(!isAudioPlaying);
      }
    };
  
    return (
      <div className="w-60 h-80 bg-[#EB5A3C] rounded-lg p-3 shadow-lg text-white">
        {/* Video or Thumbnail */}
        <div className="relative w-full h-40 rounded overflow-hidden cursor-pointer">
          {isPlaying ? (
            <video
              src={url}
              className="w-full h-full object-cover"
              autoPlay
              onEnded={() => setIsPlaying(false)}
              onClick={() => setIsPlaying(false)}
            />
          ) : (
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-full h-full object-cover"
              onClick={() => setIsPlaying(true)}
            />
          )}
  
          {/* Play Button Overlay */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-cover"
              style={{ backgroundImage: `url(${thumbnail})` }}
              onClick={() => setIsPlaying(true)}
            >
              <img src={mini_play} alt="Play Icon" className="w-12 h-12" />
            </div>
          )}
        </div>
  
        {/* Details */}
        <div className="mt-3">
            <div className="mx-2 flex justify-between items-center">
                  <h3 className="text-gray-200 ">Title:</h3>
                  <div className="text-sm uppercase">{title}</div>
            </div>
            <div className="mx-2 flex justify-between items-center">
                  <h3 className="text-gray-200">Action ID:</h3>
                  <div className="text-sm uppercase">{action_id}</div>
            </div>
            <div className="mx-2 flex justify-between items-center">
                  <h3 className="text-gray-200">Audio:</h3>
                  {/* Audio Play Button */}
                  <button
                        onClick={handleAudioToggle}
                        className={`p-2 rounded-full ${isAudioPlaying ? "bg-green-500" : " bg-opacity-50"}`}
                  >
                        <img src={mini_sound} alt="Play Audio" className="w-6 h-6" />
                  </button>
            </div>
            <button onClick={handleDelete} className="flex justify-center w-full py-2 bg-amber-500 rounded-lg">
              <img src={mini_trash} className="w-6 h-6 mr-2 "  />
              <div>Delete</div>
            </button>
        </div>
  
        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={audio} onEnded={()=>setIsAudioPlaying(false)} />
      </div>
    );
  };
  