import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[85%] text-2xl font-semibold">
      <div className="uppercase text-red-500" >Not Found</div>
      <Link className="text-base mt-5"  to="/">Go back to Dashboard</Link>
    </div>
  );
};

export default NotFound;
