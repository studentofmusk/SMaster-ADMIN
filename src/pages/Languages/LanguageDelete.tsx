import { useEffect, useState } from "react"
import { LanguageCardDelete, ListDisplay } from "../../components/Tools";
import { ILanguage } from "../Languages";
import { useAPI } from "../../hooks/useAPI";
import { get_languages } from "../../utils/apis";


export default function LanguageDelete({setPath}:{setPath:(path: string)=>any}) {
  const {data: languages, loading, error, fetchAPI} = useAPI<ILanguage[]>();
  
  useEffect(()=>{
    setPath("languages")
  }, []);
  
  useEffect(()=>{
    fetchAPI(get_languages);
  }, []);
  
  const handleClick = ()=>{
    alert("Not Implimented yet!")
  }
  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Delete Languages</h2>

      <ListDisplay
        loading={loading}
        error={error}
        data={languages}
        renderItem={(language) => <LanguageCardDelete title={language.title} handleClick={handleClick} />}
        emptyMessage="No languages available."
        className="mt-5 space-x-2 space-y-2"
      />

      
    </section>
  )
}
