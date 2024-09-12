import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const UpdateDepartment = () => {
    const params = useParams().id;
    const [departmentData, setDepartmentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosSecure();


    useEffect(()=>{
        axiosPrivate.get(`/department/${params}`)
        .then(res =>{
                setDepartmentData(res.data);
                setIsLoading(false);
        })
    },[axiosPrivate, params])
console.log(isLoading, departmentData)

    if (isLoading) {
        return <div>Loading...</div>;
      }


    return (
        <div>
            a
        </div>
    );
};

export default UpdateDepartment;