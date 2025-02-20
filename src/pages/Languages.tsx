import { useEffect } from "react"
import { Card, LanguageCard, ListDisplay } from "../components/Tools";

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { useAPI } from "../hooks/useAPI";
import { get_languages } from "../utils/apis";

export interface ILanguage{
  _id: string;
  title: string;
  seasons: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export default function Languages({setPath}:{setPath:(path: string)=>any}) {
  const {data: languages, loading, error, fetchAPI} = useAPI<ILanguage[]>();

  useEffect(()=>{
    fetchAPI(get_languages);
  }, []);

  useEffect(()=>{
    setPath("languages")
  }, []);


  const handleClick = ()=>{

  }
  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Languages</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/languages/create" />
        <Card label="delete" src={trash} to="/languages/delete" />
      </div>

      <ListDisplay
        loading={loading}
        error={error}
        data={languages}
        renderItem={(language) => <LanguageCard title={language.title} handleClick={handleClick} />}
        emptyMessage="No languages available."
        className="mt-5 space-x-2 space-y-2"
      />
    </section>
  )
}
