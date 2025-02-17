import { useEffect } from "react"

export default function Groups({setPath}:{setPath:(path: string)=>any}) {
  useEffect(()=>{
    setPath("groups")
  }, [])
  return (
    <div>Groups</div>
  )
}
