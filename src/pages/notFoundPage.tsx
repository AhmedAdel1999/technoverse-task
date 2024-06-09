import { useNavigate } from "react-router-dom";

const NotFoundPage = () =>{

    const navigate = useNavigate()

    return(
        <div className="h-full flex flex-col items-center pt-20">
            <h2 className="text-darkerText font-bold text-2xl mb-5">Error 404</h2>
            <p className="text-darkerText mb-5">The Page You Are Looking For Is Not Found</p>
            <button
              onClick={()=>navigate(-1)}
              className="btnStyle"
            >
                Go Back
            </button>
        </div>
    )
}
export default NotFoundPage;