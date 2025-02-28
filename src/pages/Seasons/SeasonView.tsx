import { useEffect, useState } from 'react'
import { useAPI } from '../../hooks/useAPI';
import { get_groups, get_languages, get_seasons } from '../../utils/apis';
import { GroupCard, LessonCard,} from '../../components/Tools';
import { useNavigate, useSearchParams } from 'react-router';
import { ISeason } from '../Seasons';
import { ILanguage } from '../Languages';
import { IGroup } from '../Groups';

export default function SeasonView({setPath}:{setPath:(path: string)=>void}) {
    const [searchParams] = useSearchParams();
    const seasonId = searchParams.get("id");

    const {data: season, fetchAPI: getSeason, loading, error} = useAPI<ISeason>();
    const {data: groups, fetchAPI: getGroups} = useAPI<IGroup[]>();
    const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();

    
    
    // Maps
    const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map());
    const [groupMap, setGroupMap] = useState<Map<string, IGroup>>(new Map());
    
    
    // States
    const navigate = useNavigate();
    const [language, setLanguage] = useState<ILanguage>();
    


    useEffect(()=>{
    setPath("seasons")
    }, [])

    useEffect(()=>{
        getLanguages(get_languages);
        getGroups(get_groups);
        getSeason(get_seasons+"?id="+seasonId);
        
    }, [])


    
  
    
    useEffect(()=>{
        setGroupMap(new Map(groups?.map((group)=>[group._id, group])));
      }, [groups]);
      
      useEffect(()=>{
          setLanguageMap(new Map(languages?.map((language)=>[language._id, language])));
      }, [languages])
      
    
      useEffect(()=>{
        if(!season) return;
        let language = languageMap.get(season.language_id);
        setLanguage(language);
      }, [season]); 


      const handleClick = (lesson_id: string)=>{
        navigate("/groups/view?id="+lesson_id);
      }
     

      


  return (
    <section className="px-10 relative h-full box-border overflow-y-hidden ">
        
        <h2 className="mt-5 text-[#EB5A3C] uppercase font-bold">View Group</h2>
        

        <div className='flex justify-between items-center mt-4'>
            <div className='flex items-center space-x-4'>

                <div className='space-x-2'>
                    <span className='text-[#EB5A3C]' >Season:</span>
                    <span>{season?.title || "NOT FOUND"}</span>
                </div>

                <div className='space-x-2'>
                    <span className='text-[#EB5A3C]' >Language:</span>
                    <span>{language?.title || "NOT FOUND"}</span>
                </div>


                <div className='space-x-2'>
                    <span className='text-[#EB5A3C]' >Total groups:</span>
                    <span className='uppercase' >{season?.groups.length || 0}</span>
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
                    season && season.groups.length > 0
                    ?
                    season.groups.map((group_id)=>{
                        
                        let group = groupMap?.get(group_id);

                        
                        return (
                            group
                            ?<GroupCard 
                                title={group.title}
                                season={season?.title}
                                language={language?.title}
                                handleClick={()=>handleClick(group._id)}/>
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

