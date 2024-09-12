import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const UpdateDepartment = () => {
  const params = useParams().id;
  const [departmentData, setDepartmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosSecure();




  useEffect(() => {
    axiosPrivate.get(`/department/${params}`).then((res) => {
      setDepartmentData(res.data);
      setIsLoading(false);
      axiosPrivate.get(`/voters${departmentData?.department}`).then((res) => {
        console.log(res.data);
      });
    });


  }, [axiosPrivate, params]);
  console.log(departmentData);





  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-center text-3xl font-semibold">
        Department of {departmentData?.department}
      </h3>
      <hr className="text-black" />

      <div>
        <h4>Program : {departmentData?.program}</h4>
        <h4>Total Batch : {departmentData?.batch?.length}</h4>
      </div>
    </div>
  );
};

export default UpdateDepartment;
