import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";

const UpdateDepartment = () => {
  const params = useParams().id;
  const [departmentData, setDepartmentData] = useState(null);
  const [departmentVoter, setDepartmentVoter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosSecure();
  const axiosPublic = useAxios()
  const [openModal, setOpenModal] = useState(false);


  const handleBatch = (e) => {
    e.preventDefault();
    const form = e.target;
    const newBatch= form.batch.value.split(",").map((item) => item.trim())
    const formData = {
      department: departmentData?.department,
      program: departmentData?.program,
      batch: [...(departmentData?.batch || []), ...newBatch]
    }
    console.log(formData);
    axiosPublic
      .put(`/department/${params}`, formData)
      .then((res) => {
        if (res?.data?.modifiedCount > 0) {
          setOpenModal(false);
          form.reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Department created successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${form?.department?.value} Department already exists!`,
          });
        } else {
          console.error(error);
        }
      });
  };







  useEffect(() => {
    axiosPrivate.get(`/department/${params}`).then((res) => {
      setDepartmentData(res.data);
      setIsLoading(false);
      axiosPrivate.get(`/voter/${departmentData?.department}`).then((res) => {
        setDepartmentVoter(res.data);
      });
    });
  }, [axiosPrivate, params, departmentData?.department]);

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
          <div key={i} className="bg-base-200">
            <div className="collapse-title text-xl font-medium flex justify-between">
              <p>{data} Batch</p>
            <p>Total Voters: {departmentVoter?.filter(e => e.batch === data).length}</p>

              <button className="text-white mx-1 bg-red-600 w-auto py-1 px-4 text-2xl rounded hover:bg-red-700 duration-300">
                    <MdDeleteOutline />
                  </button>
            </div>
          </div>
        ))}
        <div className="collapse-title text-xl font-medium flex justify-between">
              <p>Teachers</p>
            <p>Total Voters: {departmentVoter?.filter(e => e.accountType === "Teacher").length}</p>

              <button className="text-white mx-1 bg-red-600 w-auto py-1 px-4 text-2xl rounded hover:bg-red-700 duration-300">
                    <MdDeleteOutline />
                  </button>
            </div>
      </div>



      <div className="mx-auto flex items-center mt-4 justify-center">
          <button
            onClick={() => setOpenModal(true)}
            className="rounded-md bg-[#002a3f] hover:bg-[#2ec4b6] duration-300 hover:text-[#002a3f] py-2 px-5 w-1/2 text-white"
          >
            Add New Batch
          </button>
          <div
            onClick={() => setOpenModal(false)}
            className={`fixed z-[100] flex items-center justify-center ${
              openModal ? "opacity-1 visible" : "invisible opacity-0"
            } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
          >
            <div
              onClick={(e_) => e_.stopPropagation()}
              className={`absolute w-full rounded-lg bg-white dark:bg-gray-900 drop-shadow-2xl sm:w-[500px] ${
                openModal
                  ? "opacity-1 translate-y-0 duration-300"
                  : "-translate-y-20 opacity-0 duration-150"
              }`}
            >
              <form onSubmit={handleBatch} className="p-8 text-center">
                <input
                  type="text"
                  placeholder="Batch EX: 14th, 15th"
                  name="batch"
                  className="block my-2 w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                  required
                />
                <button
                  type="submit"
                  className="btn shadow w-full md:w-1/2 border-[#002a3f] bg-[#002a3f] text-white hover:text-[#002a3f] hover:border-[#2ec4b6] hover:bg-[#2ec4b6] duration-500 mt-2 hover:scale-105 hover:shadow-[#2ec4b6] uppercase text-base font-normal m-auto"
                >
                  Add Batch
                </button>
              </form>
            </div>
          </div>
        </div>




    </div>
  );
};

export default UpdateDepartment;
