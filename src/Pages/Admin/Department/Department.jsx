import { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const Department = () => {
  const [openModal, setOpenModal] = useState(false);
  const axiosPublic = useAxios();
  const handleDepartment = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      department: form.department.value,
      program: form.program.value,
      batch: form.batch.value.split(",").map(item => item.trim())    };
    console.log(formData);
    axiosPublic.post("/department", formData).then((res) => {
      if (res.data.acknowledged) {
        setOpenModal(false);
        form.reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Election created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
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
