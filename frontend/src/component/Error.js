import { Link } from "react-router-dom";
function Error()
{
     return(
            <>
            <div className="flex items-center justify-center min-h-screen bg-blue-400 ">
                  <div className="max-w-md md:max-w-2xl w-full mx-4 bg-white shadow-md rounded-xl overflow-hidden">
                        <div className="my-5">
                        <h1 className="text-center text-red-400 text-lg">There Are Not have any Component That you Want </h1>
                        </div>
                  </div>
            </div>
            </>
        );
}
export default Error;