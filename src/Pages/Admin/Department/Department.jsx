import { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import useDepartment from "../../../Hooks/useDepartment";
import { MdDeleteOutline, MdOutlineSettings } from "react-icons/md";
import { Link } from "react-router-dom";

const Department = () => {
  const [openModal, setOpenModal] = useState(false);
  const [Department, isDepartmentLoading, refetch] = useDepartment();
  const axiosPublic = useAxios();

  const handleDelete = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${e?.department}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb0029",
      cancelButtonColor: "#28b392",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/department/${e?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            axiosPublic.delete(`/voters/${e?.department}`).then((res) => {
              console.log(res);
              Swal.fire({
                icon: "success",
                title: `${e?.department} has been deleted from the database`,
                showConfirmButton: false,
                timer: 1500,
              });
            });
          }
        });
      }
    });
  };

  const handleDepartment = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      department: form.department.value,
      program: form.program.value,
      batch: form.batch.value.split(",").map((item) => item.trim()),
    };
    console.log(formData);
    axiosPublic
      .post("/department", formData)
      .then((res) => {
        if (res.data.acknowledged) {
          refetch();
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

  if (isDepartmentLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Department</th>
              <th>Program</th>
              <th className="text-center">Batch</th>
              <th className="text-center">Button</th>
            </tr>
          </thead>
          <tbody>
            {Department?.map((e, index) => (
              <tr className="hover" key={index}>
                <th>{index + 1}</th>
                <td>{e?.department}</td>
                <td>{e?.program}</td>
                <td className="text-center">{e?.batch.map((e) => `${e} `)}</td>
                <td className="text-center">
                  
                  <Link to={`/dashboard/department/${e?._id}`}>
                  <button className="text-white mx-1 bg-[#002a3f] w-auto py-1 px-4 text-2xl rounded hover:bg-[#2ec4b6] hover:text-[#002a3f] duration-300">
                    <MdOutlineSettings />
                  </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(e)}
                    className="text-white mx-1 bg-red-600 w-auto py-1 px-4 text-2xl rounded hover:bg-red-700 duration-300"
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Button */}
        <div className="mx-auto flex items-center mt-4 justify-center">
          <button
            onClick={() => setOpenModal(true)}
            className="rounded-md bg-[#002a3f] hover:bg-[#2ec4b6] duration-300 hover:text-[#002a3f] py-2 px-5 w-1/2 text-white"
          >
            Add New Department
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
              <form onSubmit={handleDepartment} className="p-8 text-center">
                <input
                  type="text"
                  placeholder="Name of Program"
                  name="program"
                  className="block my-2 w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                  required
                />
                <input
                  type="text"
                  placeholder="Name of Department"
                  name="department"
                  className="block my-2 w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                  required
                />
                <input
                  type="text"
                  placeholder="Batch EX: 14th,15th,..."
                  name="batch"
                  className="block my-2 w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                  required
                />
                <button
                  type="submit"
                  className="btn shadow w-full md:w-1/2 border-[#002a3f] bg-[#002a3f] text-white hover:text-[#002a3f] hover:border-[#2ec4b6] hover:bg-[#2ec4b6] duration-500 mt-2 hover:scale-110 hover:shadow-[#2ec4b6] uppercase text-base font-normal m-auto"
                >
                  Add Department
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
