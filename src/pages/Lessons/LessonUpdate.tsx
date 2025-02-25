import { useEffect, useState } from 'react'
import { TopicTypes } from '../Lessons'
import { Arrow } from '../../Icons/utils';
import { ILecture } from '../Lecture';
import { IV2Text } from '../V2Text';
import { IT2Video } from '../T2Video';
import { IV2Action } from '../V2Action';
import { IT2Action } from '../T2Action';
import { IVideo } from '../Videos';
import { useAPI } from '../../hooks/useAPI';
import { get_lectures, get_t2action, get_t2video, get_v2action, get_v2text, get_videos } from '../../utils/apis';
import { LectureCard, T2ActionCard, T2VideoCard, V2ActionCard, V2TextCard } from '../../components/Tools';

export default function LessonUpdate({setPath}:{setPath:(path: string)=>void}) {
    // const {data: lesson, fetchAPI: getLesson, loading, error} = useAPI<ILesson>()
    // const {data: seasons, fetchAPI: getSeasons} = useAPI<ISeason[]>();
    // const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();
    // const {data: groups, fetchAPI: getGroups} = useAPI<IGroup[]>();
    const {data: lectures, loading:lectureLoading, error:lectureError,  fetchAPI: getLectures} = useAPI<ILecture[]>();
    const {data: v2texts, loading:v2textsLoading, error:v2textsError, fetchAPI: getV2Texts} = useAPI<IV2Text[]>();
    const {data: t2videos, loading:t2videosLoading, error:t2videosError, fetchAPI: getT2Videos} = useAPI<IT2Video[]>();
    const {data: v2actions, loading:v2actionsLoading, error:v2actionsError, fetchAPI: getV2Actions} = useAPI<IV2Action[]>();
    const {data: t2actions, loading:t2actionsLoading, error:t2actionsError, fetchAPI: getT2Actions} = useAPI<IT2Action[]>();
    const {data: videos, loading:videosLoading, error:videosError, fetchAPI: getVideos} = useAPI<IVideo[]>();


    // Maps
    const [videoMap, setVideoMap] = useState<Map<string,IVideo>>(new Map());
  
    
    // States
    const [topicType, setTopicType]= useState(TopicTypes.LECTURE);
    const [toggle, setToggle] = useState<boolean>(true);


    
    useEffect(()=>{
    setPath("lessons")
    }, [])

    useEffect(()=>{
        getLectures(get_lectures);
        getV2Texts(get_v2text);
        getT2Videos(get_t2video);
        getV2Actions(get_v2action);
        getT2Actions(get_t2action);
        getVideos(get_videos);
    }, [])

    useEffect(()=>{
        setVideoMap(new Map(videos?.map((video)=>[video._id, video])));
    }, [videos])

    useEffect(()=>{ 
        console.log(topicType);
        console.log(topicType === TopicTypes.T2VIDEO);
        
    }, [topicType])


  return (
    <section className="px-10 relative h-full w-full overflow-y-hidden">
        <h2 className="text-[#EB5A3C] uppercase font-bold">Update Lesson</h2>
      
        {/* Toggle bar */}
        <div className={`absolute duration-400 ${toggle?"bottom-0":"-bottom-80"} left-0 border border-black w-full h-96`}>
            
            <div onClick={()=>setToggle(!toggle)} className='cursor-pointer'>
                <Arrow className={`size-6 ${toggle?"":"rotate-180"}`} />
            </div>
            
            <div className="flex p-2">
                <label htmlFor="topictype" className='uppercase mr-3 text-[#EB5A3C]'>Topic Type:</label>
                <select id='topictype' value={topicType} onChange={(e)=>setTopicType(e.target.value as TopicTypes)}>
                    {Object.keys(TopicTypes)
                    .filter((key) => isNaN(Number(key)))
                    .map((topic)=>(
                        <option key={topic} value={TopicTypes[topic as keyof typeof TopicTypes]}>{topic}</option>
                    ))}
                </select>
            </div>
            <div style={{scrollbarWidth: 'none'}} className='flex space-x-5 px-4 mt-2 overflow-x-scroll'>
                {
                    topicType === TopicTypes.LECTURE?
                    (
                        lectureLoading?
                        <div>Loading</div>
                        :(
                            lectureError?
                            <div>Error: {lectureError}</div>
                            :( lectures && lectures.length > 0?
                                lectures?.map((lecture)=>{
                                        const VIDEO = videoMap.get(lecture.video);
                                        return(                        
                                            VIDEO?
                                            <LectureCard 
                                                key={lecture._id}
                                                title={lecture.title}
                                                audio={VIDEO.audio}
                                                thumbnail={VIDEO.thumbnail}
                                                url={VIDEO.url}
                                            />
                
                                            :""
                                            
                                        )
                                    }
                                    
                                )
                                :<div>No Lecture Found!</div>
                            )
                        )
                    )
                    :""
                }
                {
                    topicType === TopicTypes.V2TEXT?
                    (
                        v2textsLoading?
                        <div>Loading</div>
                        :(
                            v2textsError?
                            <div>Error: {v2textsError}</div>
                            :( v2texts && v2texts.length > 0?
                                v2texts?.map((v2text)=>{
                                        const VIDEO = videoMap.get(v2text.video);
                                        return(                        
                                            VIDEO?
                                            <V2TextCard 
                                                key={v2text._id}
                                                title={v2text.title}
                                                audio={VIDEO.audio}
                                                thumbnail={VIDEO.thumbnail}
                                                url={VIDEO.url}
                                                options={v2text.options}
                                            />
                
                                            :""
                                            
                                        )
                                    }
                                    
                                )
                                :<div>No V2Text Found!</div>
                            )
                        )
                    )
                    :""
                }
                {
                    topicType === TopicTypes.T2VIDEO?
                    (
                        t2videosLoading?
                        <div>Loading</div>
                        :(
                            t2videosError?
                            <div>Error: {t2videosError}</div>
                            :( t2videos && t2videos.length > 0?
                                t2videos?.map((t2video)=>{

                                        const VIDEO_1 = videoMap.get(t2video.options[0]);
                                        const VIDEO_2 = videoMap.get(t2video.options[1]);
                                        const VIDEO_3 = videoMap.get(t2video.options[2]);
                                        const VIDEO_4 = videoMap.get(t2video.options[3]);
                                    
                                        return(                        
                                            VIDEO_1 && VIDEO_2 && VIDEO_3 && VIDEO_4?
                                            <T2VideoCard 
                                                key={t2video._id}
                                                title={t2video.title}
                                                options={[VIDEO_1, VIDEO_2, VIDEO_3, VIDEO_4]}
                                            />
                
                                            :""
                                            
                                        )
                                    }
                                    
                                )
                                :<div>No T2Video Found!</div>
                            )
                        )
                    )
                    :""
                }
                {
                    topicType === TopicTypes.V2ACTION?
                    (
                        v2actionsLoading?
                        <div>Loading</div>
                        :(
                            v2actionsError?
                            <div>Error: {v2actionsError}</div>
                            :( v2actions && v2actions.length > 0?
                                v2actions?.map((v2action)=>{
                                        const VIDEO = videoMap.get(v2action.video);
                                        return(                        
                                            VIDEO?
                                            <V2ActionCard 
                                                key={v2action._id}
                                                title={v2action.title}
                                                thumbnail={VIDEO.thumbnail}
                                                url={VIDEO.url}
                                                action_id={VIDEO.action_id}

                                            />
                
                                            :""
                                            
                                        )
                                    }
                                    
                                )
                                :<div>No V2Action Found!</div>
                            )
                        )
                    )
                    :""
                }
                {
                    topicType === TopicTypes.T2ACTION?
                    (
                        t2actionsLoading?
                        <div>Loading</div>
                        :(
                            t2actionsError?
                            <div>Error: {t2actionsError}</div>
                            :( t2actions && t2actions.length > 0?
                                t2actions?.map((t2action)=>{
                                        const VIDEO = videoMap.get(t2action.video);
                                        return(                        
                                            VIDEO?
                                            <T2ActionCard 
                                                key={t2action._id}
                                                title={t2action.title}
                                                action_id={VIDEO.action_id}

                                            />
                
                                            :""
                                            
                                        )
                                    }
                                    
                                )
                                :<div>No T2Action Found!</div>
                            )
                        )
                    )
                    :""
                }
            </div>

            
        </div>
    </section>
  )
}

