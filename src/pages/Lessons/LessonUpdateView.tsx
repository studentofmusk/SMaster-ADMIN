import { useEffect, useState } from 'react'
import { ILesson, TopicTypes } from '../Lessons'
import { Add, Arrow, Cancel } from '../../Icons/utils';
import { ILecture } from '../Lecture';
import { IV2Text } from '../V2Text';
import { IT2Video } from '../T2Video';
import { IV2Action } from '../V2Action';
import { IT2Action } from '../T2Action';
import { IVideo } from '../Videos';
import { useAPI } from '../../hooks/useAPI';
import { get_groups, get_languages, get_lectures, get_lessons, get_seasons, get_t2action, get_t2video, get_v2action, get_v2text, get_videos, update_lesson } from '../../utils/apis';
import { LectureCard, T2ActionCard, T2VideoCard, V2ActionCard, V2TextCard, V2TextCardCustom } from '../../components/Tools';
import { useSearchParams } from 'react-router';
import { ISeason } from '../Seasons';
import { ILanguage } from '../Languages';
import { IGroup } from '../Groups';

export default function LessonUpdateView({setPath}:{setPath:(path: string)=>void}) {
    const [searchParams] = useSearchParams();
    const lessonId = searchParams.get("id");

    const {data: LESSON, fetchAPI: getLesson, loading, error} = useAPI<ILesson>()
    const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();
    const {data: seasons, fetchAPI: getSeasons} = useAPI<ISeason[]>();
    const {data: groups, fetchAPI: getGroups} = useAPI<IGroup[]>();
    const {data: lectures, loading:lectureLoading, error:lectureError,  fetchAPI: getLectures} = useAPI<ILecture[]>();
    const {data: v2texts, loading:v2textsLoading, error:v2textsError, fetchAPI: getV2Texts} = useAPI<IV2Text[]>();
    const {data: t2videos, loading:t2videosLoading, error:t2videosError, fetchAPI: getT2Videos} = useAPI<IT2Video[]>();
    const {data: v2actions, loading:v2actionsLoading, error:v2actionsError, fetchAPI: getV2Actions} = useAPI<IV2Action[]>();
    const {data: t2actions, loading:t2actionsLoading, error:t2actionsError, fetchAPI: getT2Actions} = useAPI<IT2Action[]>();
    const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>();
    const {fetchAPI:updateLesson, loading:updateLoading} = useAPI<ILesson>();

    
    
    // Maps
    const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map());
    const [seasonMap, setSeasonMap] = useState<Map<string, ISeason>>(new Map());
    const [groupMap, setGroupMap] = useState<Map<string, IGroup>>(new Map());
    const [lectureMap, setLectureMap] = useState<Map<string,ILecture>>(new Map());
    const [v2textMap, setV2textMap] = useState<Map<string,IV2Text>>(new Map());
    const [t2videoMap, setT2videoMap] = useState<Map<string,IT2Video>>(new Map());
    const [v2actionMap, setV2actionMap] = useState<Map<string,IV2Action>>(new Map());
    const [t2actionMap, setT2actionMap] = useState<Map<string,IT2Action>>(new Map());
    const [videoMap, setVideoMap] = useState<Map<string,IVideo>>(new Map());
    
    
    // States
    const [lesson, setLesson] = useState<ILesson>();
    const [topicType, setTopicType]= useState(TopicTypes.LECTURE);
    const [toggle, setToggle] = useState<boolean>(false);
    const [group, setGroup] = useState<IGroup>();
    const [season, setSeason] = useState<ISeason>();
    const [language, setLanguage] = useState<ILanguage>();
    const [editmode, setEditMode] = useState<boolean>(false);
    


    useEffect(()=>{
    setPath("lessons")
    }, [])

    useEffect(()=>{
        getLanguages(get_languages);
        getSeasons(get_seasons)
        getGroups(get_groups)
        getLectures(get_lectures);
        getV2Texts(get_v2text);
        getT2Videos(get_t2video);
        getV2Actions(get_v2action);
        getT2Actions(get_t2action);
        getVideos(get_videos);
        getLesson(get_lessons + "?id=" + lessonId);
    }, [])


    useEffect(()=>{
        setVideoMap(new Map(videos?.map((video)=>[video._id, video])));
      }, [videos]);
  
    useEffect(()=>{
        setGroupMap(new Map(groups?.map((group)=>[group._id, group])));
      }, [groups]);
      
    useEffect(()=>{
        setSeasonMap(new Map(seasons?.map((season)=>[season._id, season])));
      }, [seasons]);
      
      useEffect(()=>{
          setLanguageMap(new Map(languages?.map((language)=>[language._id, language])));
      }, [languages])
      
      useEffect(()=>{
          setLectureMap(new Map(lectures?.map(l => [l._id, l])))
      }, [lectures])
      
      useEffect(()=>{
          setV2textMap(new Map(v2texts?.map(l => [l._id, l])))
      }, [v2texts])
      
      useEffect(()=>{
          setT2videoMap(new Map(t2videos?.map(l => [l._id, l])))
      }, [t2videos])
      
      useEffect(()=>{
          setV2actionMap(new Map(v2actions?.map(l => [l._id, l])))
      }, [v2actions])
      useEffect(()=>{
          setT2actionMap(new Map(t2actions?.map(l => [l._id, l])))
      }, [t2actions])


      useEffect(()=>{
        let group = groupMap.get(lesson?.group_id || "");
        let season = seasonMap.get(group?.season_id || "");
        let language = languageMap.get(season?.language_id || "");
        setGroup(group);
        setSeason(season);
        setLanguage(language)
        setLesson(LESSON??undefined);
      }, [LESSON]); 


      const handleUpdate = async()=>{
        try {
            if (!lesson) return;

            const response = await updateLesson(update_lesson, "POST", {
                lesson_id: lesson._id,
                topics: lesson.topics
            });

            if (response.success){
                alert("Lesson Updated Successfully!");
                getLesson(get_lessons + "?id=" + lessonId);
            }else{
                alert(response.message);
            }
        } catch (error) {
            alert("something went wrong!");
        }
      }
     

    type AllTopics = ILecture | IV2Text | IT2Video | IV2Action | IT2Action;

      const handleAdd = (topic: AllTopics, TOPICTYPE: TopicTypes)=>{
        if (!lesson) return;

        const newTopic = {
            topic_id: topic._id,
            topic_type: TOPICTYPE,
            xp: 0,
            skippable: false
        }

        let temp = {
            ...lesson,
            topics: lesson.topics?[...lesson.topics]:[]
        }
        temp.topics.push(newTopic);

        temp.total_xp = temp.topics.reduce((sum, topic)=>sum + (topic.xp || 0), 0)

        setLesson(temp);

      }

      const handleRemove = (idx: number)=>{
        if(!lesson) return;
        let temp = {...lesson};
        temp.topics = temp.topics?[... temp.topics]: [];
        temp.topics.splice(idx, 1);
        temp.total_xp = temp.topics.reduce((sum, topic)=>sum+(topic.xp || 0), 0);
        if (!temp.total_xp){
            temp.total_xp = 0;
        }
        setLesson(temp);
      }

      const handleXPChange = (idx: number, xp: string)=>{
        
        if(!lesson) return;
        const parsedXP = Number(xp); // Converts the full number
        if (isNaN(parsedXP)) return; // Prevent NaN errors

        

        let temp = { 
            ...lesson, 
            topics: lesson.topics ? [...lesson.topics] : []  // Clone topics array
        };


        temp.topics[idx] = {...temp.topics[idx], xp:parsedXP};
        temp.total_xp = temp.topics.reduce((sum, topic)=>sum+(topic.xp || 0), 0);
        setLesson(temp);
      }

      const handleSkippable = (idx: number, skippable: boolean)=>{
        if (!lesson) return ;
        const temp = {
            ...lesson,
            topics: lesson.topics?[...lesson.topics]:[]
        };
        temp.topics[idx].skippable = skippable;

        setLesson(temp);
        
      }


  return (
    <section className="px-10 relative h-full box-border overflow-y-hidden ">
        
        <h2 className="mt-5 text-[#EB5A3C] uppercase font-bold">Edit Lesson</h2>
        

        <div className='flex justify-between items-center mt-4'>
            <div className='flex items-center space-x-4'>
                <div className='space-x-2'>
                    <span className='text-[#EB5A3C]' >Lesson Type:</span>
                    <span>{lesson?.lesson_type || "NOT FOUND"}</span>
                </div>

                <div className='space-x-2'>
                    <span className='text-[#EB5A3C]' >Language:</span>
                    <span>{language?.title || "NOT FOUND"}</span>
                </div>

                <div className='space-x-2'>
                    <span className='text-[#EB5A3C]' >Season:</span>
                    <span>{season?.title || "NOT FOUND"}</span>
                </div>

                <div className='space-x-2'>
                    <span className='text-[#EB5A3C]' >Group:</span>
                    <span className='uppercase' >{group?.title || "NOT FOUND"}</span>
                </div>

                <div className='space-x-2'>
                    <span className='text-[#EB5A3C]' >Total XP:</span>
                    <span className='uppercase' >{lesson?.total_xp || 0}</span>
                </div>

            </div> 
        <button onClick={handleUpdate} disabled={updateLoading} className={`uppercase text-white bg-[#EB5A3C] py-2 px-4 ${updateLoading?"bg-orange-400":""}`} >{updateLoading?"Wait...":"Update"}</button>
        </div>
        <div className='space-x-2 mt-4'>
            <span className='text-[#EB5A3C]' >Edit Mode:</span>
            <span className={`cursor-pointer rounded px-2 py-1 uppercase ${editmode?"bg-green-500 text-white":"bg-red-500 text-white"}`} onClick={()=>setEditMode(!editmode)} >{editmode?"ON":"OFF"}</span>
        </div>

        {
         loading?<div>Loading...</div>
         :(
            error?<div>Error:</div>
            :<>
            
            <div style={{scrollbarWidth:"thin"}} className="mt-10 pb-10 w-full items-start overflow-x-scroll flex space-x-2 space-y-2">
                
                {
                    lesson && lesson.topics.length > 0
                    ?
                    lesson.topics.map((topic, idx)=>{
                        
                        
                        switch (topic.topic_type){
                            case (TopicTypes.LECTURE):{

                                let lecture = lectureMap?.get(topic.topic_id);
                                let VIDEO =  videoMap?.get(lecture?.video || "");
                                return (
                                    <div className='flex flex-col items-center space-y-1 justify-start'>
                                        <div onClick={()=>handleRemove(idx)} hidden={!editmode} className='cursor-pointer text-red-500 flex mb-2 items-center justify-center'>
                                            <Cancel className="size-5 mr-2" />
                                            <div>Remove</div>
                                        </div>

                                        
                                        <div hidden={!editmode} className='flex space-x-1 items-center justify-center'>
                                            <label htmlFor="xp">Skippable:</label>
                                            <button className={`px-2 py-1 uppercase ${topic.skippable? "bg-blue-400":"bg-orange-200"} text-white`} onClick={()=>handleSkippable(idx,!topic.skippable)} >{topic.skippable?"YES":"NO"}</button>
                                        </div>

                                        <div hidden={!editmode} className='flex space-x-1 items-center justify-center'>
                                            <label htmlFor="xp">XP:</label>
                                            <input value={topic.xp} onChange={(e)=>handleXPChange(idx, e.target.value)} type="number" className='border border-amber-400'  />

                                        </div>
                                        
                                        {VIDEO && lecture
                                        ?<LectureCard  
                                        title={lecture.title}
                                        url={VIDEO.url}
                                        thumbnail={VIDEO.thumbnail}
                                        audio={VIDEO.audio}
                                        />
                                        :<></>
                                    }
                                    
                                    </div>
                                )
                            }
                            
                            case (TopicTypes.V2TEXT):{

                                let v2text = v2textMap?.get(topic.topic_id);
                                let VIDEO = videoMap?.get(v2text?.video || "");
                                return (
                                    <div className='flex flex-col items-center space-y-1 justify-start'>
                                        <div onClick={()=>handleRemove(idx)} hidden={!editmode} className='cursor-pointer text-red-500 flex mb-2 items-center justify-center'>
                                            <Cancel className="size-5 mr-2" />
                                            <div>Remove</div>
                                        </div>

                                        
                                        <div hidden={!editmode} className='flex space-x-1 items-center justify-center'>
                                            <label htmlFor="xp">Skippable:</label>
                                            <button className={`px-2 py-1 uppercase ${topic.skippable? "bg-blue-400":"bg-orange-200"} text-white`} onClick={()=>handleSkippable(idx,!topic.skippable)} >{topic.skippable?"YES":"NO"}</button>
                                        </div>

                                        <div hidden={!editmode} className='flex space-x-1 items-center justify-center'>
                                            <label htmlFor="xp">XP:</label>
                                            <input value={topic.xp} onChange={(e)=>handleXPChange(idx, e.target.value)} type="number" className='border border-amber-400'  />

                                        </div>
                                        
                                        {VIDEO && v2text
                                        ?<V2TextCard
                                        title={v2text.title}
                                        url={VIDEO.url}
                                        thumbnail={VIDEO.thumbnail}
                                        audio={VIDEO.audio}
                                        options={v2text.options}
                                        />
                                        :<></>
                                    }
                                    </div>
                                )
                            }
                            
                            case (TopicTypes.T2VIDEO):{
                                let t2video = t2videoMap?.get(topic.topic_id);
                                const VIDEO_1 = videoMap.get(t2video?.options[0]|| "");
                                const VIDEO_2 = videoMap.get(t2video?.options[1]|| "");
                                const VIDEO_3 = videoMap.get(t2video?.options[2]|| "");
                                const VIDEO_4 = videoMap.get(t2video?.options[3]|| "");
                                return (
                                    <div className='flex flex-col items-center space-y-1 justify-start'>
                                        <div onClick={()=>handleRemove(idx)} hidden={!editmode} className='cursor-pointer text-red-500 flex mb-2 items-center justify-center'>
                                            <Cancel className="size-5 mr-2" />
                                            <div>Remove</div>
                                        </div>

                                        
                                        <div hidden={!editmode} className='flex space-x-1 items-center justify-center'>
                                            <label htmlFor="xp">Skippable:</label>
                                            <button className={`px-2 py-1 uppercase ${topic.skippable? "bg-blue-400":"bg-orange-200"} text-white`} onClick={()=>handleSkippable(idx,!topic.skippable)} >{topic.skippable?"YES":"NO"}</button>
                                        </div>

                                        <div hidden={!editmode} className='flex space-x-1 items-center justify-center'>
                                            <label htmlFor="xp">XP:</label>
                                            <input value={topic.xp} onChange={(e)=>handleXPChange(idx, e.target.value)} type="number" className='border border-amber-400'  />

                                        </div>
                                        <T2VideoCard  
                                        title={t2video?.title || "No Title"}
                                        options={[VIDEO_1, VIDEO_2, VIDEO_3, VIDEO_4]}
                                        />
                                    </div>
                                    );
                                
                            }
                            case (TopicTypes.V2ACTION):{
                                
                                let v2action = v2actionMap?.get(topic.topic_id);
                                let VIDEO = videoMap.get(v2action?.video || "");
                                return (
                                    <div className='flex flex-col items-center space-y-1 justify-start'>
                                        <div onClick={()=>handleRemove(idx)} hidden={!editmode} className='cursor-pointer text-red-500 flex mb-2 items-center justify-center'>
                                            <Cancel className="size-5 mr-2" />
                                            <div>Remove</div>
                                        </div>

                                        
                                        <div hidden={!editmode} className='flex space-x-1 items-center justify-center'>
                                            <label htmlFor="xp">Skippable:</label>
                                            <button className={`px-2 py-1 uppercase ${topic.skippable? "bg-blue-400":"bg-orange-200"} text-white`} onClick={()=>handleSkippable(idx,!topic.skippable)} >{topic.skippable?"YES":"NO"}</button>
                                        </div>

                                        <div hidden={!editmode} className='flex space-x-1 items-center justify-center'>
                                            <label htmlFor="xp">XP:</label>
                                            <input value={topic.xp} onChange={(e)=>handleXPChange(idx, e.target.value)} type="number" className='border border-amber-400'  />

                                        </div>
                                        
                                        {VIDEO && v2action
                                        ?<V2ActionCard  
                                            title={v2action.title}
                                            url={VIDEO.url}
                                            thumbnail={VIDEO.thumbnail}
                                            action_id={VIDEO.action_id}
                                            />
                                        :<></>
                                    }
                                    </div>
                                )
                            }
                            
                            case (TopicTypes.T2ACTION):{
                                let t2action = t2actionMap?.get(topic.topic_id);
                                const VIDEO = videoMap.get(t2action?.video || "");
                                return (
                                    <div className='flex flex-col items-center space-y-1 justify-start'>
                                        <div onClick={()=>handleRemove(idx)} hidden={!editmode} className='cursor-pointer text-red-500 flex mb-2 items-center justify-center'>
                                            <Cancel className="size-5 mr-2" />
                                            <div>Remove</div>
                                        </div>

                                        
                                        <div hidden={!editmode} className='flex space-x-1 items-center justify-center'>
                                            <label htmlFor="xp">Skippable:</label>
                                            <button className={`px-2 py-1 uppercase ${topic.skippable? "bg-blue-400":"bg-orange-200"} text-white`} onClick={()=>handleSkippable(idx,!topic.skippable)} >{topic.skippable?"YES":"NO"}</button>
                                        </div>

                                        <div hidden={!editmode} className='flex space-x-1 items-center justify-center'>
                                            <label htmlFor="xp">XP:</label>
                                            <input value={topic.xp} onChange={(e)=>handleXPChange(idx, e.target.value)} type="number" className='border border-amber-400'  />

                                        </div>
                                        
                                        {VIDEO && t2action
                                        ?<T2ActionCard  
                                            title={t2action.title}
                                            action_id={VIDEO.action_id}
                                            />
                                        :<></>
                                    }
                                    
                                    </div>
                                )
                            }
                            default:
                                return  "";
                            }
                    })
                    :"No Topics Found"
                }

            
                </div>
            </>
         )   
        }

       
        {/* Toggle bar */}
        <div className={`absolute duration-400 bg-white ${toggle?"bottom-0":"-bottom-80"} left-0 overflow-y-scroll w-full border border-gray-400 shadow-lg h-96`} >
            
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
                                            <div className='relative'>
                                                <button onClick={()=>handleAdd(lecture, TopicTypes.LECTURE)} className='absolute z-20 uppercase text-white bg-[#EB5A3C] p-2'><Add className='size-4' /></button>
                                                <LectureCard 
                                                    key={lecture._id}
                                                    title={lecture.title}
                                                    audio={VIDEO.audio}
                                                    thumbnail={VIDEO.thumbnail}
                                                    url={VIDEO.url}
                                                />
                                            </div>
                
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
                                            <div className='relative'>
                                                <button onClick={()=>handleAdd(v2text, TopicTypes.V2TEXT)} className='absolute z-20 uppercase text-white bg-[#EB5A3C] p-2'><Add className='size-4' /></button>
                                                <V2TextCard 
                                                    key={v2text._id}
                                                    title={v2text.title}
                                                    audio={VIDEO.audio}
                                                    thumbnail={VIDEO.thumbnail}
                                                    url={VIDEO.url}
                                                    options={v2text.options}
                                                />
                                            </div>
                
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
                                            <div className='relative'>
                                                <button onClick={()=>handleAdd(t2video, TopicTypes.T2VIDEO)} className='absolute z-20 uppercase text-white bg-[#EB5A3C] p-2'><Add className='size-4' /></button>
                                                <T2VideoCard 
                                                    key={t2video._id}
                                                    title={t2video.title}
                                                    options={[VIDEO_1, VIDEO_2, VIDEO_3, VIDEO_4]}
                                                />
                                            </div>
                
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
                                            <div className='relative'>
                                                <button onClick={()=>handleAdd(v2action, TopicTypes.V2ACTION)} className='absolute z-20 uppercase text-white bg-[#EB5A3C] p-2'><Add className='size-4' /></button>
                                                
                                                <V2ActionCard 
                                                    key={v2action._id}
                                                    title={v2action.title}
                                                    thumbnail={VIDEO.thumbnail}
                                                    url={VIDEO.url}
                                                    action_id={VIDEO.action_id}
                                                />
                                            </div>
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
                                            <div className='relative'>
                                                <button onClick={()=>handleAdd(t2action, TopicTypes.T2ACTION)} className='absolute z-20 uppercase text-white bg-[#EB5A3C] p-2'><Add className='size-4' /></button>
                                                
                                                <T2ActionCard 
                                                    key={t2action._id}
                                                    title={t2action.title}
                                                    action_id={VIDEO.action_id}

                                                />
                                            </div>
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

