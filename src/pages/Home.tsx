import { useEffect } from "react"

export default function Home({setPath}:{setPath:(path: string)=>any}) {
  useEffect(()=>{
    setPath("dashboard")
  }, [])
  return (
    <div>Home</div>
  )
}
