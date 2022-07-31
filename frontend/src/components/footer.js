import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation().pathname
    return(
        <div className={location == "/" ? "hidden" : "bg-indigo-900 flex justify-end text-white pr-5 text-indigo-300 text-sm font-medium"}>
            <p className={location == "/" ? "hidden" : ""}>SIT Academy</p>
        </div>
    )
}

export default Footer;