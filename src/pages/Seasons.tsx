import { useEffect } from "react"

export default function Seasons({setPath}:{setPath:(path: string)=>any}) {
  useEffect(()=>{
    setPath("seasons")
  }, [])
  return (
    <div>Seasons</div>
  )
}
