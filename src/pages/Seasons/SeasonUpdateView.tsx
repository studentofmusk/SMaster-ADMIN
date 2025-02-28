import { useEffect, useState } from 'react'
import { Add, Arrow, Cancel } from '../../Icons/utils';
import { useAPI } from '../../hooks/useAPI';
import { get_groups, get_languages, get_seasons, update_season } from '../../utils/apis';
import { GroupCard} from '../../components/Tools';
import { useSearchParams } from 'react-router';
import { ISeason } from '../Seasons';
import { ILanguage } from '../Languages';
import { IGroup } from '../Groups';

export default function SeasonUpdateView({setPath}:{setPath:(path: string)=>void}) {
    const [searchParams] = useSearchParams();
    const seasonId = searchParams.get("id");

    const {data: SEASON, fetchAPI: getSeason, loading, error} = useAPI<ISeason>();
    const {data: languages, fetchAPI: getLanguages} = useAPI<ILanguage[]>();
    const {data: groups, fetchAPI: getGroups} = useAPI<IGroup[]>();
    const {fetchAPI:updateSeason, loading:updateLoading} = useAPI<ISeason>();

    
    
    // Maps
    const [languageMap, setLanguageMap] = useState<Map<string, ILanguage>>(new Map());
    const [groupMap, setGroupMap] = useState<Map<string, IGroup>>(new Map());
    
    
    // States
    const [toggle, setToggle] = useState<boolean>(false);
    const [season, setSeason] = useState<ISeason>();
    const [language, setLanguage] = useState<ILanguage>();
    const [editmode, setEditMode] = useState<boolean>(false);
    


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
        if(!SEASON) return;
        setSeason(SEASON);
        let language = languageMap.get(SEASON.language_id);
        setLanguage(language);
      }, [SEASON]); 


      const handleUpdate = async()=>{
        try {
            if(!season) return;
            const response = await updateSeason(update_season, "POST", {
                season_id: seasonId,
                groups: season.groups??[]
            })

            if(response.success){
                alert("Season Updated!");
                getSeason(get_seasons+"?id="+seasonId);
            }else{
                alert(response.message)
            }
        } catch (error) {
            alert("something went wrong!");
        }
      }
     

      const handleAdd = (id: string)=>{
        if(!season) return;

        let temp = {
            ...season,
            groups: season.groups?[...season.groups]:[]
        }

        temp.groups.push(id);
        setSeason(temp);

      }

      const handleRemove = (idx: number)=>{
        if (!season) return;
        let temp = {
            ...season,
            groups: season.groups?[...season.groups]:[]
        }

        temp.groups.splice(idx, 1);

        setSeason(temp);
      }



  return (
    <section className="px-10 relative h-full box-border overflow-y-hidden ">
        
        <h2 className="mt-5 text-[#EB5A3C] uppercase font-bold">Edit Season</h2>

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
                    season && season.groups.length > 0
                    ?
                    season.groups.map((group_id, idx)=>{
                        
                        let group = groupMap?.get(group_id);

                        
                        return (
                            <div className='flex flex-col items-center space-y-1 justify-start'>
                                <div onClick={()=>handleRemove(idx)} hidden={!editmode} className='cursor-pointer text-red-500 flex mb-2 items-center justify-center'>
                                    <Cancel className="size-5 mr-2" />
                                    <div>Remove</div>
                                </div>

                                
                                {group
                                ?<GroupCard 
                                    title={group.title}
                                    season={season?.title}
                                    language={language?.title}
                                    handleClick={()=>{}}/>
                                :<></>
                            }
                            
                            </div>
                        )
                    }):<div>No Group Found!</div>
                }
            </div>

            </>
        )
        }
       
        {/* Toggle bar */}
        <div className={`absolute duration-400 bg-white ${toggle?"bottom-0":"-bottom-64"} left-0 overflow-y-scroll w-full border border-gray-400 shadow-lg h-72`} >
            
            <div onClick={()=>setToggle(!toggle)} className='ml-2 cursor-pointer flex space-x-2'>
                <Arrow className={`size-6 ${toggle?"":"rotate-180"}`} />
                <div className='text-[#EB5A3C]'>Groups</div>
            </div>
            

            <div style={{scrollbarWidth: 'none'}} className='flex space-x-5 px-4 mt-2 overflow-x-scroll h-[70%] items-center'>
                {
                    season && groups && groups.length > 0?
                    groups.filter((group)=>group.season_id === season._id && !season.groups.includes(group._id)).map((group)=>(
                        <div className='relative'>
                            <button onClick={()=>handleAdd(group._id)} className='absolute z-20 uppercase text-[#EB5A3C] bg-white p-2'><Add className='size-4' /></button>
                            <GroupCard
                            key={group._id}
                            title={group.title}
                            language={language?.title}
                            season={season?.title}
                            handleClick={()=>{}}
                            />
                        </div>
                    ))
                    :<div>No Group Found</div>
                }    
            </div>

            
        </div>
    </section>
  )
}

