import { useEffect } from "react"

export default function Languages({setPath}:{setPath:(path: string)=>any}) {
  useEffect(()=>{
    setPath("languages")
  }, [])
  return (
    <div>Languages</div>
  )
}
