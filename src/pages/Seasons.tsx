import { useEffect } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card } from "../components/tools";

export default function Seasons({setPath}:{setPath:(path: string)=>any}) {
  useEffect(()=>{
    setPath("seasons")
  }, [])
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Seasons</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/seasons/create" />
        <Card label="delete" src={trash} to="/seasons/delete" />
      </div>
    </section>
  )
}
