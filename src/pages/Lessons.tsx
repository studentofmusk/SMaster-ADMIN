import { useEffect } from "react"

export default function Lessons({setPath}:{setPath:(path: string)=>any}) {
  useEffect(()=>{
    setPath("lessons")
  }, [])
  return (
    <div>Lessons</div>
  )
}
