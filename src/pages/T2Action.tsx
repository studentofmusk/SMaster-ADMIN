import { useEffect } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card} from "../components/Tools";


export default function T2Action({setPath}:{setPath:(path: string)=>any}) {
  const handleClick = ()=>{

  }

  useEffect(()=>{
    setPath("t2action")
  }, []);

  return (
    <section className="px-10 h-[85vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">T2Action</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/t2action/create" />
        <Card label="delete" src={trash} to="/t2action/delete" />
      </div>

    </section>
  )
}
