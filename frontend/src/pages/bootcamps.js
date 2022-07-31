import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../store/baseurl";
import Axios from "axios";
import UpComingBootcampsCard from "../components/upcomingBootcampsCard";
import UpcominBootcampsGraph2 from "../components/upcominBootcampsGraph2";


const Bootcamps = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [bootcamp_type, setBootcampType] = useState("");
  const [bootcamp_location, setBootcampLocation] = useState("");
  const [bootcampsData, setBootcamps] = useState([]);
  const [toggleValue, setValue] = useState(true);
  const [bootcampsFilteredData, setBootcampsFilteredData] = useState([])
  const [locations, setLocations] = useState([])

  useEffect(() => {
    getLocations();
    getBootcamps();
    // setBootcamps(bootcampsData);
    // getBootcampsFiltered();
  }, [bootcamp_location, start_date]);

  const getBootcamps = async () => {
    if (bootcamp_location === "" && start_date === "") {
      const response = await Axios.post(`${baseurl}bootcamps/upcoming/10`);
    setBootcamps(response.data);
    }

    else if (bootcamp_location === "") {
    const response = await Axios.post(
      `${baseurl}bootcamps/upcoming/10`,
      { start_date: start_date }
    )
      setBootcamps(response.data)
      console.log(start_date)
    }

    else if (start_date === "") {
      const response = await Axios.post(
        `${baseurl}bootcamps/upcoming/10`,
        { bootcamp_location: bootcamp_location }
      )
        setBootcamps(response.data)
      }
      else {
        const response = await Axios.post(
          `${baseurl}bootcamps/upcoming/10`,
          {
            bootcamp_location: bootcamp_location,
            start_date: start_date
          }
        )
      setBootcamps(response.data)
        }
  };

  // const getBootcamps = async () => {
  //   const response = await Axios.post(`${baseurl}bootcamps/upcoming/10`);
  //   setBootcamps(response.data);
  // };

  const getLocations = async () => {
    const response = await Axios(`${baseurl}locations/all/`);
    setLocations(response.data);
  };


  const Switch = ({ isOn, handleToggle, onColor }) => {
    return (
      <div className="flex ml-10 px-90">
        <span className="ml-2  text-base text-gray-800 px-3 ">All Bootcamps</span>
        <label className="relative flex items-center cursor-pointer ">
          <input
            type="checkbox"
            id="toggle"
            className="sr-only peer "
            checked={isOn}
            onChange={handleToggle}
          />
          <div className="h-6 bg-gray-200 border-2 border-toggelButton rounded-full w-11  after:absolute after:top-0.5 after:left-0.5 after:bg-toggelBackgroud after:border after:border-gray-300 after:h-5 after:w-5 after:shadow-sm after:rounded-full peer-checked:after:translate-x-full peer-checked:after:border-toggelBackgroud  peer-checked:bg-backgroud peer-checked:border-toggelButton after:transition-all after:duration-300"></div>
          <span className="ml-2 text-base text-gray-800 ">Upcoming Bootcamps</span>
        </label>
      </div>
    );
  };



  return (
    <div className="flex flex-col p-2 w-full h-full bg-background">
        <div className="flex border my-1 bg-offwhite  rounded-xl h-cardsT font-bold shadow-lg">
          <form className="flex w-full h-full  items-center justify-between px-20">
          Filters:
          <div className="border-b-2">
          <label className="pr-1">
          Location:
            <select
                className="bg-offwhite"
                name="bootcamp_location"
                value={bootcamp_location}
                onChange={e => setBootcampLocation(e.target.value)}>
            <option value=""key="">All</option>
                {locations.map(function (item) {
                return <option value={item.id} key={item.id}>{item.location}</option>
            })}
            </select>
          </label>
          </div>
          <div className="border-b-2">
          <label>
            Bootcamp start on or after: 
            <input
            className="bg-offwhite pl-1"
            name="start_date"
            type="date"
            value={start_date}
            onChange={e => setStartDate(e.target.value)} />
          </label>
          </div>
          </form>
        {/* <Switch
              isOn={toggleValue}
              handleToggle={() => setValue(!toggleValue)}
            /> */}
      </div>

      <div className="flex flex-col w-full  h-cardsHeight6 items-center justify-center ">
        <div className="flex h-full w-cardsWidth2 bg-offwhite shadow-lg rounded-lg">
          <UpcominBootcampsGraph2 data={bootcampsData} />
        </div>
      </div>
       

  {/* <div className="flex flex-col w-full h-screen bg-background">
   */}
        <div className="flex h-cardsHeight6 mt-6  w-full items-center justify-center ">
        <div className="flex h-full w-full justify-center  ">
           <div className="grid grid-cols-2  h-full w-cardsWidth2   overflow-auto gap-y-6  ">
            {bootcampsData.slice(0,10).map((item) => (
              <UpComingBootcampsCard data={item} key={item.id}/>
            ))}
        </div>


    </div>

    </div>


    
    </div>
  
    );
    };

export default Bootcamps;
