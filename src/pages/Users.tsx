import { useEffect } from "react"

export default function Users({setPath}:{setPath:(path: string)=>any}) {
  useEffect(()=>{
    setPath("users")
  }, [])
  return (
    <div>Users</div>
  )
}
