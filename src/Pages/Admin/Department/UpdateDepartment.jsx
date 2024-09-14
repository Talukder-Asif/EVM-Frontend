import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const UpdateDepartment = () => {
  const params = useParams().id;
  const [departmentData, setDepartmentData] = useState(null);
  const [departmentVoter, setDepartmentVoter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosSecure();

  useEffect(() => {
    axiosPrivate.get(`/department/${params}`).then((res) => {
      setDepartmentData(res.data);
      setIsLoading(false);
      axiosPrivate.get(`/voter/${departmentData?.department}`).then((res) => {
        setDepartmentVoter(res.data);
      });
    });
  }, [axiosPrivate, params, departmentData?.department]);

  console.log(departmentData);
  console.log(departmentVoter);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-center text-3xl font-semibold">
        Department of {departmentData?.department}
      </h3>
      <hr className="text-black my-5" />

      <div>
        <h4>Program : {departmentData?.program}</h4>
        <h4>Total Batch : {departmentData?.batch?.length}</h4>
        <h4>Total Voters : {departmentVoter?.length}</h4>
      </div>



      <div className="space-y-4">
        {departmentData?.batch.map((data, i) => (
          <div key={i} className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              {data} Batch
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        ))}
        <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Teachers
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
      </div>




    </div>
  );
};

export default UpdateDepartment;
