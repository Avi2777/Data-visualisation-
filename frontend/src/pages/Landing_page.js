import Splash_art from '../assets/Analytics process_Isometric.png'
import {Link} from 'react-router-dom'

const Landing_page = () => {
    return(
        <div className="flex w-full h-full bg-indigo-900 place-content-center gap-5 py-5">
                <div className=" flex flex-col w-3/6 h-full">
                    <div className=" flex flex-col w-full h-1/6">
                        <p className="text-5xl font-bold text-white" >SIT<span className="italic text-red-500">Dash</span> <span className="text-sm">academy data - visualized</span></p>
                    </div>
                    <div className=" flex w-full place-content-between gap-5 items-center">
                       <div className="flex flex-col gap-5 h-2/3 w-1/3 place-content-between">
                           <div className="flex flex-col gap-5">
                            <p className="text-5xl font-bold text-white">Visualize data</p>
                            <p className="text-white">Our goal was to build a platform that translates the academy’s data into a visual context, making it easier to pull insights and information from. <br></br>The tool aims to give an overview to identify patterns and trends in student applications and monitor the performance of students and the academy’s courses alike.
                            </p>
                            </div>
                           <Link to="/dashboard" ><button className="bg-white drop-shadow-xl rounded-md w-2/3 py-5"><span className="text-indigo-900 font-bold text-3xl">Lets Go!</span></button> </Link>
                       </div>
                        <div className="p-5 rounded-lg h-full">
                            <img  src={Splash_art}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Landing_page;