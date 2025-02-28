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
import { get_groups, get_languages, get_lectures, get_lessons, get_seasons, get_t2action, get_t2video, get_v2action, get_v2text, get_videos, update_group, update_lesson } from '../../utils/apis';
import { LectureCard, LessonCard, T2ActionCard, T2VideoCard, V2ActionCard, V2TextCard, V2TextCardCustom } from '../../components/Tools';
import { useSearchParams } from 'react-router';
import { ISeason } from '../Seasons';
import { ILanguage } from '../Languages';
import { IGroup } from '../Groups';

export default function GroupUpdateView({setPath}:{setPath:(path: string)=>void}) {
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get("id");

    const {data: GROUP, fetchAPI: getGroup, loading, error} = useAPI<IGroup>();
    const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();
    const {data: seasons, fetchAPI: getSeasons} = useAPI<ISeason[]>();
    const {data: lessons, fetchAPI: getLessons} = useAPI<ILesson[]>();
    const {fetchAPI:updateGroup, loading:updateLoading} = useAPI<IGroup>();

    
    
    // Maps
    const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map());
    const [seasonMap, setSeasonMap] = useState<Map<string, ISeason>>(new Map());
    const [lessonMap, setLessonMap] = useState<Map<string, ILesson>>(new Map());
    
    
    // States
    const [group, setGroup] = useState<IGroup>();
    const [toggle, setToggle] = useState<boolean>(false);
    const [season, setSeason] = useState<ISeason>();
    const [language, setLanguage] = useState<ILanguage>();
    const [editmode, setEditMode] = useState<boolean>(false);
    


    useEffect(()=>{
    setPath("groups")
    }, [])

    useEffect(()=>{
        getLanguages(get_languages);
        getSeasons(get_seasons)
        getLessons(get_lessons);
        getGroup(get_groups+"?id="+groupId);
        
    }, [])


    
  
    
    useEffect(()=>{
        setLessonMap(new Map(lessons?.map((lesson)=>[lesson._id, lesson])));
      }, [lessons]);
    
    useEffect(()=>{
        setSeasonMap(new Map(seasons?.map((season)=>[season._id, season])));
      }, [seasons]);
      
      useEffect(()=>{
          setLanguageMap(new Map(languages?.map((language)=>[language._id, language])));
      }, [languages])
      
    
      useEffect(()=>{
        if(!GROUP) return;
        setGroup(GROUP);
        let season = seasonMap.get(GROUP.season_id || "");
        let language = languageMap.get(season?.language_id || "");
        setSeason(season);
        setLanguage(language)
      }, [GROUP]); 


      const handleUpdate = async()=>{
        try {
            if(!group) return;
            const response = await updateGroup(update_group, "POST", {
                group_id: groupId,
                lessons: group.lessons??[]
            })

            if(response.success){
                alert("Group Updated!");
                getGroup(get_groups+"?id="+groupId);
            }else{
                alert(response.message)
            }
        } catch (error) {
            alert("something went wrong!");
        }
      }
     

      const handleAdd = (id: string)=>{
        if(!group) return;

        let temp = {
            ...group,
            lessons: group.lessons?[...group.lessons]:[]
        }

        temp.lessons.push(id);
        setGroup(temp);

      }

      const handleRemove = (idx: number)=>{
        if (!group) return;
        let temp = {
            ...group,
            lessons: group.lessons?[...group.lessons]:[]
        }

        temp.lessons.splice(idx, 1);

        setGroup(temp);
      }



  return (
    <section className="px-10 relative h-full box-border overflow-y-hidden ">
        
        <h2 className="mt-5 text-[#EB5A3C] uppercase font-bold">Edit Group</h2>

        <div className='flex justify-between items-center mt-4'>
            <div className='flex items-center space-x-4'>
                
                <div className='space-x-2'>
                    <span className='text-[#EB5A3C]' >Group:</span>
                    <span className='uppercase' >{group?.title || "NOT FOUND"}</span>
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
                    <span className='text-[#EB5A3C]' >Total lessons:</span>
                    <span className='uppercase' >{group?.lessons.length || 0}</span>
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
                    group && group.lessons.length > 0
                    ?
                    group.lessons.map((lesson_id, idx)=>{
                        
                        let lesson = lessonMap?.get(lesson_id);

                        
                        return (
                            <div className='flex flex-col items-center space-y-1 justify-start'>
                                <div onClick={()=>handleRemove(idx)} hidden={!editmode} className='cursor-pointer text-red-500 flex mb-2 items-center justify-center'>
                                    <Cancel className="size-5 mr-2" />
                                    <div>Remove</div>
                                </div>

                                
                                {lesson
                                ?<LessonCard 
                                    title={lesson.lesson_type}
                                    group={group.title} 
                                    season={season?.title}
                                    language={language?.title}
                                    handleClick={()=>{}}/>
                                :<></>
                            }
                            
                            </div>
                        )
                    }):<div>No Lessons Found!</div>
                }
            </div>

            </>
        )
        }
       
        {/* Toggle bar */}
        <div className={`absolute duration-400 bg-white ${toggle?"bottom-0":"-bottom-64"} left-0 overflow-y-scroll w-full border border-gray-400 shadow-lg h-72`} >
            
            <div onClick={()=>setToggle(!toggle)} className='ml-2 cursor-pointer flex space-x-2'>
                <Arrow className={`size-6 ${toggle?"":"rotate-180"}`} />
                <div className='text-[#EB5A3C]'>Lessons</div>
            </div>
            

            <div style={{scrollbarWidth: 'none'}} className='flex space-x-5 px-4 mt-2 overflow-x-scroll h-[70%] items-center'>
                {
                    group && lessons && lessons.length > 0?
                    lessons.filter((lesson)=>lesson.group_id === group._id && !group.lessons.includes(lesson._id)).map((lesson)=>(
                        <div className='relative'>
                            <button onClick={()=>handleAdd(lesson._id)} className='absolute z-20 uppercase text-[#EB5A3C] bg-white p-2'><Add className='size-4' /></button>
                            <LessonCard
                            key={lesson._id}
                            group={group.title}
                            title={lesson.lesson_type}
                            language={language?.title}
                            season={season?.title}
                            handleClick={()=>{}}
                            />
                        </div>
                    ))
                    :<div>No Lessons Found</div>
                }    
            </div>

            
        </div>
    </section>
  )
}

