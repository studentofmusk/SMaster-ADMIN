import {useNavigate} from "react-router"

// Icons
import logout from "../images/utils/logout.png"
import back from "../images/utils/back.png"

export default function TopNav() {
  const navigate = useNavigate();
  return (
    <div className='flex w-full items-center px-4'>
      <img src={back} onClick={()=>navigate(-1)} className='w-8' />
      <button className='mt-4 ml-auto flex flex-col items-center'> 
          <img src={logout} className='w-10' />
          <div className='text-sm' >Logout</div>
      </button>
    </div>
  )
}
