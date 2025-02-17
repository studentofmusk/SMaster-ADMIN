import { useEffect } from "react"


export default function Users({setPath}:{setPath:(path: string)=>any}) {
  useEffect(()=>{
    setPath("users")
  }, [])
  return (
    <section className="px-10 ">
      <h2 className="text-[#EB5A3C] uppercase font-bold">Users</h2>
    </section>
  )
}
