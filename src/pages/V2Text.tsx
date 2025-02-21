import { useEffect } from "react"

// Icons
import plus from "../images/utils/plus.png";
import trash from "../images/utils/trash.png";
import { Card} from "../components/Tools";


export default function V2Text({setPath}:{setPath:(path: string)=>any}) {
  const handleClick = ()=>{

  }

  useEffect(()=>{
    setPath("v2text")
  }, []);

  return (
    <section className="px-10 h-[85vh]">
      <h2 className="text-[#EB5A3C] uppercase font-bold">V2Texts</h2>
      <div className="mt-4 flex space-x-4">
        <Card label="create" src={plus} to="/v2text/create" />
        <Card label="delete" src={trash} to="/v2text/delete" />
      </div>

    </section>
  )
}
