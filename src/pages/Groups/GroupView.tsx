import { useEffect, useState } from 'react'
import { ILesson } from '../Lessons'
import { useAPI } from '../../hooks/useAPI';
import { get_groups, get_languages, get_lessons, get_seasons } from '../../utils/apis';
import { LessonCard,} from '../../components/Tools';
import { useNavigate, useSearchParams } from 'react-router';
import { ISeason } from '../Seasons';
import { ILanguage } from '../Languages';
import { IGroup } from '../Groups';

export default function GroupView({setPath}:{setPath:(path: string)=>void}) {
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get("id");

    const {data: GROUP, fetchAPI: getGroup, loading, error} = useAPI<IGroup>();
    const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();
    const {data: seasons, fetchAPI: getSeasons} = useAPI<ISeason[]>();
    const {data: lessons, fetchAPI: getLessons} = useAPI<ILesson[]>();

    
    
    // Maps
    const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map());
    const [seasonMap, setSeasonMap] = useState<Map<string, ISeason>>(new Map());
    const [lessonMap, setLessonMap] = useState<Map<string, ILesson>>(new Map());
    
    
    // States
    const navigate = useNavigate();
    const [group, setGroup] = useState<IGroup>();
    const [season, setSeason] = useState<ISeason>();
    const [language, setLanguage] = useState<ILanguage>();
    


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


      const handleClick = (lesson_id: string)=>{
        navigate("/lessons/view?id="+lesson_id);
      }
     

      


  return (
    <section className="px-10 relative h-full box-border overflow-y-hidden ">
        
        <h2 className="mt-5 text-[#EB5A3C] uppercase font-bold">View Group</h2>
        

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
        </div>
        

        {
         loading?<div>Loading...</div>
         :(
            error?<div>Error:</div>
            :<>
            
            <div style={{scrollbarWidth:"thin"}} className="mt-10 pb-10 w-full items-start flex flex-wrap space-x-2 space-y-2">
                
                {
                    group && group.lessons.length > 0
                    ?
                    group.lessons.map((lesson_id)=>{
                        
                        let lesson = lessonMap?.get(lesson_id);

                        
                        return (
                            lesson
                            ?<LessonCard 
                                title={lesson.lesson_type}
                                group={group.title} 
                                season={season?.title}
                                language={language?.title}
                                handleClick={()=>handleClick(lesson._id)}/>
                            :<></>
                        )
                    }):<div>No Lessons Found!</div>
                }
            </div>

            </>
        )
        }
       
    </section>
  )
}

