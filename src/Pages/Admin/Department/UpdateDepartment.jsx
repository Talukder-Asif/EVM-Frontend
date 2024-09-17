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
  const axiosPublic = useAxios();
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [refatch, setRefatch] = useState(false);

  const handleBatch = (e) => {
    e.preventDefault();
    const form = e.target;
    const newBatch = form.batch.value.split(",").map((item) => item.trim());

    const existingBatch = departmentData?.batch || [];
    const duplicateBatches = newBatch.filter((batch) =>
      existingBatch.includes(batch)
    );

    if (duplicateBatches.length > 0) {
      setError(`Batch ${duplicateBatches.join(", ")} already exist!`);
      return;
    } else {
      setError("");
    }

    const formData = {
      department: departmentData?.department,
      program: departmentData?.program,
      batch: [...existingBatch, ...newBatch],
    };

    axiosPublic
      .put(`/department/${params}`, formData)
      .then((res) => {
        if (res?.data?.modifiedCount > 0) {
          setOpenModal(false);
          setRefatch(!refatch)
          form.reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Department updated successfully!",
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

  const handleDelete = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${e} batch? All voters of ${e} batch will be delete.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb0029",
      cancelButtonColor: "#28b392",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = {
          department: departmentData?.department,
          program: departmentData?.program,
          batch: departmentData?.batch.filter((data) => data !== e),
        };

        axiosPublic.put(`/department/${params}`, formData).then((res) => {
          if (res?.data?.modifiedCount > 0) {
            axiosPublic
              .delete(`/voters/${departmentData?.department}/${e}`)
              .then((res) => {
                console.log(res.data)
                setRefatch(!refatch)
                Swal.fire({
                  icon: "success",
                  title: `${e} batch has been deleted from the database`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
          }
        });
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
  }, [axiosPrivate, params, departmentData?.department, refatch]);

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
              <p>
                Total Voters:{" "}
                {departmentVoter?.filter((e) => e.batch === data).length}
              </p>

              <button
                onClick={() => handleDelete(data)}
                className="text-white mx-1 bg-red-600 w-auto py-1 px-4 text-2xl rounded hover:bg-red-700 duration-300"
              >
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        ))}
        <div className="collapse-title text-xl bg-base-200 font-medium flex justify-between">
          <p>Teachers</p>
          <p>
            Total Voters:{" "}
            {departmentVoter?.filter((e) => e.accountType === "Teacher").length}
          </p>

          <div> </div>
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
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p> // Display error if exists
              )}
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
