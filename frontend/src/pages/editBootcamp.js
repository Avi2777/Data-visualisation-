import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import { baseurl } from "../store/baseurl";


const EditBootcamp = () => {

    const params = useParams().id
    const navigate = useNavigate()

    const [bootcampData, setBootcampData] = useState({})
    const [locations, setLocations] = useState([])
    const [types, setTypes] = useState([])

    useEffect(() => {
        getBootcampData()
        getLocations()
        getTypes()
    }, [])

    const getBootcampData = async () => {
        const response = await Axios(
            `${baseurl}bootcamps/${params}`
          );
          console.log(response.data)
          setBootcampData(response.data);
    };

    const getLocations = async () => {
        const response = await Axios(
            `${baseurl}locations/all/`
        );
        setLocations(response.data)
    }

    const getTypes = async () => {
        const response = await Axios(
            `${baseurl}types/all/`
        );
        setTypes(response.data)
    }

    const onChangeHandler = (event) => {
        let newState = {...bootcampData}
        newState[event.target.id] = event.target.value
        setBootcampData(newState)
    }
    const checkoxChanger = (event) => {
        let newState = {...bootcampData}
        newState[event.target.id] = !newState[event.target.id]
        setBootcampData(newState)
    }

    const saveChanges = async() => {
        const response = await Axios.patch(
            `${baseurl}bootcamps/${params}`, bootcampData
        );
        if (response.status == 200){
            alert('Changes saved')
            navigate(-1)
        }    
    }

    return(
        <div className="flex flex-col w-full p-5">
            <div><p className="text-xl font-bold">Bootcamp data</p></div>
            <div className="flex place-content-between pt-5">
                <div className="flex w-1/2 gap-20">
                    <div className=" flex flex-col gap-5 w-1/3">

                        <div className="flex flex-col">
                            <label className="font-bold" htmlFor="name" >Name</label>
                            <input onChange={onChangeHandler} value={bootcampData.name ?? ''}  typeof="text" className="w-full border border-black-100 bg-gray-100" id="name"/>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold" htmlFor="bootcamp_type" >Bootcamp-type</label>
                            <select onChange={onChangeHandler} value={bootcampData.bootcamp_type ?? ''} className="w-full border border-black-100 bg-gray-100" id="bootcamp_type">
                                {types.map((type) => <option key={type.id} value={type.id}> {type.name} </option>)}   
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold" htmlFor="bootcamp_location" >Bootcamp location</label>
                            <select onChange={onChangeHandler} value={bootcampData.bootcamp_location ?? ''} className="w-full border border-black-100 bg-gray-100" id="bootcamp_location">
                                {locations.map((location) => <option key={location.id} value={location.id}> {location.name} </option>)}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold" htmlFor="early_apply_by" >Early apply by:</label>
                            <input onChange={onChangeHandler} value={bootcampData.early_apply_by ?? ''} typeof="text" className="w-full border border-black-100 bg-gray-100" id="early_apply_by"/>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold" htmlFor="apply_by" >Apply by:</label>
                            <input onChange={onChangeHandler} value={bootcampData.apply_by ?? ''} typeof="text" className="w-full border border-black-100 bg-gray-100" id="apply_by"/>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold" htmlFor="start_date" >Start date:</label>
                            <input onChange={onChangeHandler} value={bootcampData.start_date ?? ''} typeof="text" className="w-full border border-black-100 bg-gray-100" id="start_date"/>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold" htmlFor="end_date" >End date:</label>
                            <input onChange={onChangeHandler} value={bootcampData.end_date ?? ''} typeof="text" className="w-full border border-black-100 bg-gray-100" id="end_date"/>
                        </div>

                    </div>
                    <div className=" flex flex-col gap-5">
                        <div className="flex items-center">
                            <input onChange={checkoxChanger} checked={bootcampData.active ?? false} type="checkbox" className="mr-5 border border-black-100 bg-gray-100" id="active"/>
                            <label className="font-bold" htmlFor="active" >Active</label>
                        </div>
                        <div className="flex items-center">
                            <input onChange={checkoxChanger} checked={bootcampData.is_part_time ?? false} type="checkbox" className="mr-5 border border-black-100 bg-gray-100" id="is_part_time"/>
                            <label className="font-bold" htmlFor="is_part_time" >Is part time</label>
                        </div>
                        <div className="flex items-center">
                            <input onChange={checkoxChanger} checked={bootcampData.is_in_person ?? false} type="checkbox" className="mr-5 border border-black-100 bg-gray-100" id="is_in_person"/>
                            <label className="font-bold" htmlFor="is_in_person" >Is in person</label>
                        </div>
                        <div className="flex items-center">
                            <input onChange={checkoxChanger} checked={bootcampData.is_remote ?? false} type="checkbox" className="mr-5 border border-black-100 bg-gray-100" id="is_remote"/>
                            <label className="font-bold" htmlFor="is_remote" >Is remote</label>
                        </div>
                    </div>
                </div>
                <div className="h-1/4 w-1/5 flex flex-col gap-5">
                    <button onClick={saveChanges} className="border border-black-300 bg-green-200 w-4/5">SAVE</button>
                    <button onClick={() => navigate(-1)} className="border border-black-300 bg-red-300 w-4/5">CANCEL</button>
                </div>
            </div>
        </div>
    )
};

export default EditBootcamp