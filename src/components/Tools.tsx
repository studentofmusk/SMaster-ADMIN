import React, { useRef, useState } from "react";
import { Link } from "react-router";

// Icons
import mini_play from "../images/utils/mini_play.png";
import mini_sound from "../images/utils/mini_sound.png";
import mini_trash from "../images/utils/mini_trash.png";
import { IVideo } from "../pages/Videos";
import { ILecture } from "../pages/Lecture";
import { IT2Video } from "../pages/T2Video";
import { IV2Text } from "../pages/V2Text";
import { IV2Action } from "../pages/V2Action";
import { IT2Action } from "../pages/T2Action";
import { ILesson, TopicTypes } from "../pages/Lessons";


interface ListDisplayProps<T> {
  loading: boolean;
  error: string | null;
  data: T[] | null;
  renderItem: (item: T) => React.JSX.Element;
  emptyMessage?: string;
  className?: string;
}

export const Card = ({label, src, to}:{[key:string]:string})=>(
    <Link to={to} className="py-7 px-10 flex items-center justify-center space-x-2 bg-[#DF9755] rounded-lg">
          <img src={src} className="w-10" />
          <div className="uppercase text-xl text-white font-bold">{label}</div>
    </Link>
);
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
        <div className="relative w-full h-32 rounded overflow-hidden cursor-pointer">
          {isPlaying ? (
            <video
              src={url}
              className="w-full h-full object-cover"
              autoPlay
              onEnded={() => setIsPlaying(false)}
              onClick={() => setIsPlaying(false)}
              muted={true}
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
        <div className="mt-8">
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
        <div className="relative w-full h-32 rounded overflow-hidden cursor-pointer">
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
        <div className="mt-8">
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
export const LanguageCard = ({title, handleClick}:{title:string, handleClick:()=>any})=>{
  return (
    <div onClick={handleClick} className="cursor-pointer w-40 h-28 flex justify-center items-center rounded-sm bg-[#EB5A3C] text-white text-3xl uppercase">
      <div>{title}</div>
    </div>
  )
}
export const LanguageCardDelete = ({title, handleClick}:{title:string, handleClick:()=>any})=>{
  return (
    <div className="relative w-40 h-28 flex justify-center items-center rounded-sm bg-[#EB5A3C] text-white text-3xl uppercase">
      <div>{title}</div>
      <img src={mini_trash} className="absolute bottom-0 right-0 p-3 w-12 cursor-pointer" onClick={handleClick}/>
    </div>
  )
} 
export const SeasonCard = ({title, handleClick}:{title:string, handleClick:()=>any})=>{
  return (
    <div onClick={handleClick} className="cursor-pointer w-40 h-20 flex justify-center items-center rounded-sm bg-[#EB5A3C] text-white text-xl uppercase">
      <div>{title}</div>
    </div>
  )
}
export const SeasonCardDelete = ({title, handleClick}:{title:string, handleClick:()=>any})=>{
  return (
    <div className="relative w-40 h-20 flex justify-center items-center rounded-sm bg-[#EB5A3C] text-white text-xl uppercase">
      <div>{title}</div>
      <img src={mini_trash} className="absolute w-10 bottom-0 right-0 p-3 cursor-pointer" onClick={handleClick}/>
    </div>
  )
}
export const GroupCard = ({title, handleClick}:{title:string, handleClick:()=>any})=>{
  return (
    <div onClick={handleClick} className="cursor-pointer w-80 h-20 flex justify-center items-center rounded-sm bg-[#EB5A3C] text-white text-xl uppercase">
      <div>{title}</div>
    </div>
  )
}
export const GroupCardDelete = ({title, handleClick}:{title:string, handleClick:()=>any})=>{
  return (
    <div className="relative w-80 h-20 flex justify-center items-center rounded-sm bg-[#EB5A3C] text-white text-xl uppercase">
      <div>{title}</div>
      <img src={mini_trash} className="absolute w-10 bottom-0 right-0 p-3 cursor-pointer" onClick={handleClick}/>
    </div>
  )
}
export const LessonCard = ({title, group, language, season, handleClick}:{
  title:string;
  group:string | undefined;
  language: string | undefined;
  season: string | undefined;
  handleClick:()=>any;

})=>{
  return (
    <div onClick={handleClick} className="relative w-60 h-32 cursor-pointer flex justify-center items-center rounded-sm border border-gray-300 shadow-lg bg-[#EB5A3C] text-white text-lg uppercase">
        
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="text-center">{title}</div>
        <div className="text-center text-sm text-orange-100" >{group??"No Group"}</div>
      </div>

      <div className="absolute bottom-0 left-0 bg-white text-[#EB5A3C] text-xs rounded-tr-xs font-bold uppercase p-1" >{language??"No Language"}</div>
      <div className="absolute bottom-0 right-0 bg-white text-[#EB5A3C] text-xs rounded-tl-xs font-bold uppercase p-1" >{season??"No Season"}</div>
      
      </div>
  )
}

export const LessonCardDelete = ({title, group, language, season, handleDelete}:{
  title:string;
  group:string | undefined;
  language: string | undefined;
  season: string | undefined;
  handleDelete:()=>any;

})=>{
  return (
    <div className="relative w-60 h-32 cursor-pointer flex justify-center items-center rounded-sm border border-gray-300 shadow-lg bg-[#EB5A3C] text-white text-lg uppercase">
        
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="text-center">{title}</div>
        <div className="text-center text-sm text-orange-100" >{group??"No Group"}</div>
      </div>

      <div className="absolute bottom-0 left-0 bg-white text-[#EB5A3C] text-xs rounded-tr-xs font-bold uppercase p-1" >{language??"No Language"}</div>
      <div className="absolute bottom-0 right-0 bg-white text-[#EB5A3C] text-xs rounded-tl-xs font-bold uppercase p-1" >{season??"No Season"}</div>
      <img src={mini_trash} className="absolute w-12 top-0 right-0 p-3 cursor-pointer" onClick={handleDelete}/>

      </div>
  )
}
export const ListDisplay = <T,>({
  loading,
  error,
  data,
  renderItem,
  emptyMessage = "No items available.",
  className = "",
}: ListDisplayProps<T>) => {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {loading ? (
        <div className="text-blue-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500 font-semibold">⚠ Error: {error}</div>
      ) : data && data.length > 0 ? (
        data.map(renderItem)
      ) : (
        <div className="text-gray-500">{emptyMessage}</div>
      )}
    </div>
  );
};
export const LectureCard = ({ title, url, audio, thumbnail,
}: {
  title: string;
  url: string;
  audio: string;
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
    <div className="shrink-0 w-60 bg-white-100 rounded-lg p-3 shadow-xl text-gray-600  border border-gray-200" >
      {/* Video or Thumbnail */}
      <div className="relative w-full h-32 rounded overflow-hidden cursor-pointer">
        {isPlaying ? (
          <video
            src={url}
            muted={true}
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
      <div className="mt-8">
          <div className="mx-2 flex justify-between items-center">
                <div className="text-sm uppercase font-bold">{title}</div>
                {/* Audio Play Button */}
                <button
                      onClick={handleAudioToggle}
                      className={`p-2 rounded-full ${isAudioPlaying ? "bg-green-500" : "bg-[#EB5A3C] bg-opacity-50"}`}
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
export const LectureCardDelete = ({ title, url, audio, thumbnail, handleDelete
}: {
  title: string;
  url: string;
  audio: string;
  thumbnail: string;
  handleDelete: ()=>any;
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
    <div className="w-60 bg-white-100 rounded-lg p-3 shadow-xl text-gray-600  border border-gray-200" >
      {/* Video or Thumbnail */}
      <div className="relative w-full h-32 rounded overflow-hidden cursor-pointer">
        {isPlaying ? (
          <video
            src={url}
            muted={true}
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
      <div className="mt-8">
          <div className="mx-2 flex justify-between items-center">
                <div className="text-sm uppercase font-bold">{title}</div>
                {/* Audio Play Button */}
                <button
                      onClick={handleAudioToggle}
                      className={`p-2 rounded-full ${isAudioPlaying ? "bg-green-500" : "bg-[#EB5A3C] bg-opacity-50"}`}
                >
                      <img src={mini_sound} alt="Play Audio" className="w-6 h-6" />
                </button>
          </div>
      </div>
      <button onClick={handleDelete} className="mt-2 w-full rounded-sm text-center bg-[#EB5A3C] text-white uppercase font-bold" >Delete</button>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audio} onEnded={()=>setIsAudioPlaying(false)} />
    </div>
  );
};
export const V2TextCard = ({ title, url, audio, thumbnail,options
}: {
  title: string;
  url: string;
  audio: string;
  thumbnail: string;
  options: string[];
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
    <div className="shrink-0 w-80 bg-white-100 rounded-lg p-3 shadow-xl text-gray-600  border border-gray-200" >
      {/* Video or Thumbnail */}
      <div className="relative w-full rounded overflow-hidden cursor-pointer">
        {isPlaying ? (
          <video
            src={url}
            muted={true}
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
      <div className="mt-8">
          <div className="mx-2 flex justify-between items-center">
                <div className="text-sm uppercase font-bold">{title}</div>
                {/* Audio Play Button */}
                <button
                      onClick={handleAudioToggle}
                      className={`p-2 rounded-full ${isAudioPlaying ? "bg-green-500" : "bg-[#EB5A3C] bg-opacity-50"}`}
                >
                      <img src={mini_sound} alt="Play Audio" className="w-6 h-6" />
                </button>
          </div>
      </div>
      {/* Options */}
      {options && options.length > 0
      ?<div className="mt-4 flex flex-wrap items-center justify-start space-x-1">
          {options.map((option)=>(
            <div className={` ${title === option?"bg-green-400":"bg-red-400"} uppercase p-1 text-white  text-sm font-bold border border-gray-400 shadow-sm rounded-sm`}>{option}</div>
          ))}
        </div>
      :<center className="mt-4">No options</center>}
      

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audio} onEnded={()=>setIsAudioPlaying(false)} />
    </div>
  );
};
export const V2TextCardDelete = ({ title, url, audio, thumbnail, options, handleDelete
}: {
  title: string;
  url: string;
  audio: string;
  thumbnail: string;
  options:string[];
  handleDelete: ()=>any;
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
    <div className="w-60 bg-white-100 rounded-lg p-3 shadow-xl text-gray-600  border border-gray-200" >
      {/* Video or Thumbnail */}
      <div className="relative w-full h-32 rounded overflow-hidden cursor-pointer">
        {isPlaying ? (
          <video
            src={url}
            muted={true}
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
      <div className="mt-8">
          <div className="mx-2 flex justify-between items-center">
                <div className="text-sm uppercase font-bold">{title}</div>
                {/* Audio Play Button */}
                <button
                      onClick={handleAudioToggle}
                      className={`p-2 rounded-full ${isAudioPlaying ? "bg-green-500" : "bg-[#EB5A3C] bg-opacity-50"}`}
                >
                      <img src={mini_sound} alt="Play Audio" className="w-6 h-6" />
                </button>
          </div>
      </div>
      
      {/* Options */}
      {options && options.length > 0
      ?<div className="mt-4 flex flex-wrap items-center justify-start space-x-1">
          {options.map((option)=>(
            <div className={` ${title === option?"bg-green-400":"bg-red-400"} uppercase p-1 text-white  text-sm font-bold border border-gray-400 shadow-sm rounded-sm`}>{option}</div>
          ))}
        </div>
      :<center className="mt-4">No options</center>}
      

      <button onClick={handleDelete} className="mt-2 w-full rounded-sm text-center bg-[#EB5A3C] text-white uppercase font-bold" >Delete</button>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audio} onEnded={()=>setIsAudioPlaying(false)} />
    </div>
  );
};
export const T2VideoCard = ({ title, options
}: {
  title: string;
  options: [IVideo | undefined, IVideo | undefined, IVideo | undefined, IVideo | undefined];
}) => {
  

  return (
    <div className="shrink-0 w-96 bg-white-100 rounded-lg p-3 shadow-xl text-gray-600  border border-gray-200" >
      

      {/* title */}
      <div className="mt-2">
          <div className="mx-2 flex justify-between items-center">
                <div className="text-sm uppercase font-bold">{title}</div>
          </div>
      </div>
      {/* Options */}
      {options && options.length > 0
      ?<div className="mt-4 flex flex-wrap justify-start">
          {options.map((video)=>{
              if(!video) return <div>No video</div>
              const [isPlaying, setIsPlaying] = useState(false);
              
              return (
                <div className="relative w-40 cursor-pointer m-2">
                {isPlaying ? (
                  <video
                    src={video.url}
                    muted={true}
                    className="w-full h-full object-cover"
                    autoPlay
                    onEnded={() => setIsPlaying(false)}
                    onClick={() => setIsPlaying(false)}
                  />
                ) : (
                  <img
                    src={video.thumbnail}
                    alt="Thumbnail"
                    className="w-40 object-cover"
                    onClick={() => setIsPlaying(true)}
                  />
                )}
        
                {/* Play Button Overlay */}
                {!isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-cover"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                    onClick={() => setIsPlaying(true)}
                  >
                    <img src={mini_play} alt="Play Icon" className="w-12 h-12" />
                  </div>
                )}
              </div>
              )
          })}
        </div>
      :<center className="mt-4">No options</center>}
      

      </div>
  );
};
export const T2VideoCardDelete = ({ title, options, handleDelete
}: {
  title: string;
  options: [IVideo | undefined, IVideo | undefined, IVideo | undefined, IVideo | undefined];
  handleDelete: ()=>any
}) => {
  

  return (
    <div className="w-96 bg-white-100 rounded-lg p-3 shadow-xl text-gray-600  border border-gray-200" >
      

      {/* title */}
      <div className="mt-2">
          <div className="mx-2 flex justify-between items-center">
                <div className="text-sm uppercase font-bold">{title}</div>
                <img src={mini_trash} onClick={handleDelete} className="invert-100 w-6" />
          </div>
      </div>
      {/* Options */}
      {options && options.length > 0
      ?<div className="mt-4 flex flex-wrap justify-start">
          {options.map((video)=>{
              if(!video) return <div>No video</div>
              const [isPlaying, setIsPlaying] = useState(false);
              
              return (
                <div className="relative w-40 cursor-pointer m-2">
                {isPlaying ? (
                  <video
                    src={video.url}
                    muted={true}
                    className="w-full h-full object-cover"
                    autoPlay
                    onEnded={() => setIsPlaying(false)}
                    onClick={() => setIsPlaying(false)}
                  />
                ) : (
                  <img
                    src={video.thumbnail}
                    alt="Thumbnail"
                    className="w-40 object-cover"
                    onClick={() => setIsPlaying(true)}
                  />
                )}
        
                {/* Play Button Overlay */}
                {!isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-cover"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                    onClick={() => setIsPlaying(true)}
                  >
                    <img src={mini_play} alt="Play Icon" className="w-12 h-12" />
                  </div>
                )}
              </div>
              )
          })}
        </div>
      :<center className="mt-4">No options</center>}
      

      </div>
  );
};
export const V2ActionCard = ({ title, url, thumbnail, action_id
}: {
  title: string;
  url: string;
  thumbnail: string;
  action_id: number;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="shrink-0 w-60 bg-white-100 rounded-lg p-3 shadow-xl text-gray-600  border border-gray-200" >
      {/* Video or Thumbnail */}
      <div className="relative w-full h-32 rounded overflow-hidden cursor-pointer">
        {isPlaying ? (
          <video
            src={url}
            muted={true}
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
      <div className="mt-8">
          <div className="mx-2 flex justify-between items-center">
                <div className="text-sm uppercase font-bold">{title}</div>
          </div>
          <div className="py-2 mt-2 mx-2 flex flex-col justify-center border border-[#EB5A3C] shadow items-center ">
            <div className="uppercase text-xs font-bold text-[#EB5A3C]" >Action id</div>
            <div className="" >{action_id}</div>
          </div>
      </div>

      
    </div>
  );
};
export const V2ActionCardDelete = ({ title, url, thumbnail, action_id, handleDelete
}: {
  title: string;
  url: string;
  thumbnail: string;
  action_id: number;
  handleDelete:()=>any;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-60 bg-white-100 rounded-lg p-3 shadow-xl text-gray-600  border border-gray-200" >
      {/* Video or Thumbnail */}
      <div className="relative w-full h-32 rounded overflow-hidden cursor-pointer">
        {isPlaying ? (
          <video
            src={url}
            muted={true}
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
      <div className="mt-8">
          <div className="mx-2 flex justify-between items-center">
                <div className="text-sm uppercase font-bold">{title}</div>
          </div>
          <div className="py-2 mt-2 mx-2 flex flex-col justify-center border border-[#EB5A3C] shadow items-center ">
            <div className="uppercase text-xs font-bold text-[#EB5A3C]" >Action id</div>
            <div className="" >{action_id}</div>
          </div>
      </div>

      <div onClick={handleDelete} className="mt-2 uppercase font-bold text-white bg-[#EB5A3C] p-2 text-center" >Delete</div>
      </div>

  );
};
export const T2ActionCard = ({ title, action_id
}: {
  title: string;
  action_id: number;
}) => {

  return (
    <div className="w-60 bg-white-100 rounded-lg p-3 shadow-xl text-gray-600  border border-gray-200" >

      {/* Details */}
      <div className="mt-4">
          <div className="mx-2 flex justify-between items-center">
                <div className="text-sm uppercase font-bold">{title}</div>
          </div>
          <div className="py-2 mt-2 mx-2 flex flex-col justify-center border border-[#EB5A3C] shadow items-center ">
            <div className="uppercase text-xs font-bold text-[#EB5A3C]" >Action id</div>
            <div className="" >{action_id}</div>
          </div>
      </div>

      
    </div>
  );
};
export const T2ActionCardDelete = ({ title, action_id, handleDelete
}: {
  title: string;
  action_id: number;
  handleDelete:()=>any;
}) => {

  return (
    <div className="w-60 bg-white-100 rounded-lg p-3 shadow-xl text-gray-600  border border-gray-200" >

      {/* Details */}
      <div className="mt-4">
          <div className="mx-2 flex justify-between items-center">
                <div className="text-sm uppercase font-bold">{title}</div>
          </div>
          <div className="py-2 mt-2 mx-2 flex flex-col justify-center border border-[#EB5A3C] shadow items-center ">
            <div className="uppercase text-xs font-bold text-[#EB5A3C]" >Action id</div>
            <div className="" >{action_id}</div>
          </div>
      </div>

      <div onClick={handleDelete} className="mt-2 uppercase font-bold text-white bg-[#EB5A3C] p-2 text-center" >Delete</div>
      </div>

  );
};