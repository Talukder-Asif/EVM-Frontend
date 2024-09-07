import { MdDeleteOutline, MdOutlineSettings } from "react-icons/md";
import useDepartment from "../../../Hooks/useDepartment";
import { useState } from "react";

const Voters = () => {
  const [Department, isDepartmentLoading, refetch] = useDepartment();
  const [openModal, setOpenModal] = useState(false);
  const [accountType, setAccountType] = useState("Student");
  const [imageUpload ,setImageUpload] = useState(null);
  const handleAddVoter = (e) =>{
    e.preventDefault();
    console.log("addVoter")
  }




  return (
    <div>
      <div className="flex justify-between items-center flex-wrap my-5">
        <div>
          <h3 className="text-2xl font-semibold">List Of voters</h3>
        </div>





        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="btn shadow border-[#002a3f] bg-[#002a3f] text-white hover:text-[#002a3f] hover:border-[#2ec4b6] hover:bg-[#2ec4b6] duration-500 hover:scale-110 hover:shadow-[#2ec4b6] uppercase text-base font-medium"
          >
            Add New Voter
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
                      <form
          onSubmit={handleAddVoter}
          className="h-full duration-300 p-5"
        >
          <h1 className="mb-6 uppercase backdrop-blur-sm sm:text-2xl">
            Add New Voter
          </h1>
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              required
            />

            {/* Type of Account */}
            <select
              name="accountType"
              onChange={(e) => setAccountType(e.target.value)}
              className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              required
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>

            {/* Department */}
            <select
              name="department"
              className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              required
            >
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="BBA">BBA</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="English">English</option>
              <option value="MIS">MIS</option>
            </select>


            {accountType === "Student" && (
              <>
                <input
                  type="number"
                  name="batch"
                  placeholder="Batch No"
                  className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                />
                <input
                  type="number"
                  name="studentID"
                  placeholder="Student ID"
                  className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                />
              </>
            )}

            <input
              type="file"
              onChange={(e) => setImageUpload(e.target.files[0])}
              className="file-input file-input-bordered w-full block rounded-md border outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
            />
          </div>

          {/* button type will be submit for handling form submission*/}
          <div className="text-center">
            <button
              type="submit"
              className="btn shadow w-full md:w-1/2 border-[#002a3f] bg-[#002a3f] text-white hover:text-[#002a3f] hover:border-[#2ec4b6] hover:bg-[#2ec4b6] duration-500 m-2 hover:scale-110 hover:shadow-[#2ec4b6] uppercase text-base font-normal"
            >
              Submit
            </button>
          </div>
        </form>
            </div>
          </div>
        </div>






      </div>
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
                  <button className="text-white mx-1 bg-[#002a3f] w-auto py-1 px-4 text-2xl rounded hover:bg-[#2ec4b6] hover:text-[#002a3f] duration-300">
                    <MdOutlineSettings />
                  </button>

                  <button className="text-white mx-1 bg-red-600 w-auto py-1 px-4 text-2xl rounded hover:bg-red-700 duration-300">
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Voters;
