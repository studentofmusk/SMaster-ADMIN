import { useEffect, useState } from "react"
import { Card, LectureCard, LessonCard, ListDisplay, T2ActionCard, T2VideoCard, V2ActionCard, V2TextCard } from "../../components/Tools";
import { IGroup } from "../Groups";
import { useAPI } from "../../hooks/useAPI";
import { get_groups, get_languages, get_lectures, get_lessons, get_seasons, get_t2action, get_t2video, get_v2action, get_v2text, get_videos} from "../../utils/apis";
import { ILecture } from "../Lecture";
import { IV2Text } from "../V2Text";
import { IT2Video } from "../T2Video";
import { IV2Action } from "../V2Action";
import { IT2Action } from "../T2Action";
import { ILesson, TopicTypes } from "../Lessons";
import { useSearchParams } from "react-router";
import { ISeason } from "../Seasons";
import { ILanguage } from "../Languages";
import { IVideo } from "../Videos";


export default function LessonView({setPath}:{setPath:(path: string)=>any}) {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");

  const {data: lesson, fetchAPI: getLesson, loading, error} = useAPI<ILesson>()
  const {data: seasons, fetchAPI: getSeasons} = useAPI<ISeason[]>();
  const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();
  const {data: groups, fetchAPI: getGroups} = useAPI<IGroup[]>();
  const {data: lectures, fetchAPI: getLectures} = useAPI<ILecture[]>();
  const {data: v2texts, fetchAPI: getV2Texts} = useAPI<IV2Text[]>();
  const {data: t2videos, fetchAPI: getT2Videos} = useAPI<IT2Video[]>();
  const {data: v2actions, fetchAPI: getV2Actions} = useAPI<IV2Action[]>();
  const {data: t2actions, fetchAPI: getT2Actions} = useAPI<IT2Action[]>();
  const {data: videos, fetchAPI: getVideos} = useAPI<IVideo[]>();

  // states
  const [group, setGroup] = useState<IGroup>();
  const [season, setSeason] = useState<ISeason>();
  const [language, setLanguage] = useState<ILanguage>();
  
  
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
        getVideos(get_videos);
        getLectures(get_lectures);
        getV2Texts(get_v2text);
        getT2Videos(get_t2video);
        getV2Actions(get_v2action);
        getT2Actions(get_t2action);
        getGroups(get_groups);
        getSeasons(get_seasons);
        getLanguages(get_languages);
        getLesson(`${get_lessons}?id=${lessonId??''}`);
        
        
    }, []);

    useEffect(()=>{
        let group = groupMap.get(lesson?.group_id || "");
        let season = seasonMap.get(group?.season_id || "");
        let language = languageMap.get(season?.language_id || "");
    
        setGroup(group);
        setSeason(season);
        setLanguage(language)
      }, [lesson]);  
    
  useEffect(()=>{
    setPath("lessons")
  }, [])



  return (
    <section className="px-10 h-[80vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">View Lesson</h2>

      <table className="mt-4">
        <tbody>
            <tr>
                <td className="px-10 py-1 uppercase text-[#DF9755]">Language:</td>
                <td className="px-10 py-1 uppercase text-gray-500 ">{language?.title || "Not Found"}</td>
            </tr>
            
            <tr>
                <td className="px-10 py-1 uppercase text-[#DF9755]">Season:</td>
                <td className="px-10 py-1 uppercase text-gray-500 ">{season?.title || "Not Found"}</td>
            </tr>

            <tr>
                <td className="px-10 py-1 uppercase text-[#DF9755]">Group:</td>
                <td className="px-10 py-1 uppercase text-gray-500 ">{group?.title || "Not Found"}</td>
            </tr>

            <tr>
                <td className="px-10 py-1 uppercase text-[#DF9755]">Lesson Type:</td>
                <td className="px-10 py-1 uppercase text-gray-500 ">{lesson?.lesson_type}</td>
            </tr>

            <tr>
                <td className="px-10 py-1 uppercase text-[#DF9755]">Total XP:</td>
                <td className="px-10 py-1 uppercase text-gray-500 ">{lesson?.total_xp || 0}</td>
            </tr>


        </tbody>
      </table>
      
      <div className="mt-4 h-[70%] items-start overflow-y-scroll flex flex-wrap space-x-2 space-y-2">
        
        {
            lesson && lesson.topics.length > 0
            ?
            lesson.topics.map((topic)=>{
                
                
                switch (topic.topic_type){
                    case (TopicTypes.LECTURE):{

                        let lecture = lectureMap?.get(topic.topic_id);
                        let VIDEO =  videoMap?.get(lecture?.video || "");
                        return (
                            <>{VIDEO && lecture
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
                    }
                    
                    case (TopicTypes.V2TEXT):{

                        let v2text = v2textMap?.get(topic.topic_id);
                        let VIDEO = videoMap?.get(v2text?.video || "");
                        return (
                            <>{VIDEO && v2text
                                ?<V2TextCard  
                                title={v2text.title}
                                url={VIDEO.url}
                                thumbnail={VIDEO.thumbnail}
                                audio={VIDEO.audio}
                                options={v2text.options}
                                />
                                :<></>
                            }
                            </>
                        )
                    }
                    
                    case (TopicTypes.T2VIDEO):{
                        let t2video = t2videoMap?.get(topic.topic_id);
                        const VIDEO_1 = videoMap.get(t2video?.options[0]|| "");
                        const VIDEO_2 = videoMap.get(t2video?.options[1]|| "");
                        const VIDEO_3 = videoMap.get(t2video?.options[2]|| "");
                        const VIDEO_4 = videoMap.get(t2video?.options[3]|| "");
                        return (
                                <T2VideoCard  
                                title={t2video?.title || "No Title"}
                                options={[VIDEO_1, VIDEO_2, VIDEO_3, VIDEO_4]}
                                />
                            );
                        
                    }
                    case (TopicTypes.V2ACTION):{
                        
                        let v2action = v2actionMap?.get(topic.topic_id);
                        let VIDEO = videoMap.get(v2action?.video || "");
                        return (
                            <>{VIDEO && v2action
                                ?<V2ActionCard  
                                    title={v2action.title}
                                    url={VIDEO.url}
                                    thumbnail={VIDEO.thumbnail}
                                    action_id={VIDEO.action_id}
                                    />
                                :<></>
                            }
                            </>
                        )
                    }
                    
                    case (TopicTypes.T2ACTION):{
                        let t2action = t2actionMap?.get(topic.topic_id);
                        const VIDEO = videoMap.get(t2action?.video || "");
                        return (
                            <>{VIDEO && t2action
                                ?<T2ActionCard  
                                    title={t2action.title}
                                    action_id={VIDEO.action_id}
                                    />
                                :<></>
                            }
                            
                            </>
                        )
                    }
                    default:
                        return  "";
                    }
            })
            :"No Topics Found"
        }

      
    </div>
    </section>
  )
}
