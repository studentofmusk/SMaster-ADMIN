import { useEffect } from "react"
import { Card } from "../components/Tools";

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";

export default function Languages({setPath}:{setPath:(path: string)=>any}) {
  useEffect(()=>{
    setPath("languages")
  }, []);

  
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Languages</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/languages/create" />
        <Card label="delete" src={trash} to="/languages/delete" />
      </div>
    </section>
  )
}
