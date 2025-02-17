import { Link } from "react-router";

export const Card = ({label, src, to}:{[key:string]:string})=>(
    <Link to={to} className="py-7 px-10 flex items-center justify-center space-x-2 bg-[#DF9755] rounded-lg">
          <img src={src} className="w-10" />
          <div className="uppercase text-xl text-white font-bold">{label}</div>
    </Link>
  )