import { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const departments = ["CSE", "EEE", "English", "Pharmacy", "BBA", "MIS", "LAW"];

const AddElections = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
const axiosPublic = useAxios()
  const toggleDepartmentSelection = (department) => {
    if (selectedDepartments.includes(department)) {
      setSelectedDepartments(
        selectedDepartments.filter((d) => d !== department)
      );
    } else {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      electionName: form.electionName.value,
      date: form.date.value,
      departments: selectedDepartments,
      details: form.details.value,
      candidate: [{}],
      voter: [{}],
      status: "Upcoming"
    };
    console.log(formData);

    // Add your API call here
    axiosPublic.post('/election', formData)
    .then(res =>{
        console.log(res.data)
        if(res.data.acknowledged){
            setSelectedDepartments([])
            form.reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Election created successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
        }
    })
  };
  return (
    <div className=" mx-auto mt-10 bg-white p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
        <h1 className="mb-3 uppercase sm:mb-5 sm:text-2xl">Create Election</h1>

        {/* Election Name */}
        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Enter the election name"
            id="electionName"
            name="electionName"
            required
            className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
          />

          {/* Date */}
          <input
            type="date"
            id="date"
            name="date"
            required
            className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {departments.map((department) => (
              <button
                type="button"
                key={department}
                className={`px-3 py-2 border rounded-md shadow-sm sm:text-sm focus:outline-none ${
                  selectedDepartments.includes(department)
                    ? "bg-[#002a3f] text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => toggleDepartmentSelection(department)}
              >
                {department}
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <textarea
          id="details"
          name="details"
          required
          className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
          rows="4"
          placeholder="Enter election details"
        ></textarea>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn shadow w-full md:w-1/2 border-[#002a3f] bg-[#002a3f] text-white hover:text-[#002a3f] hover:border-[#2ec4b6] hover:bg-[#2ec4b6] duration-500 m-2 hover:scale-110 hover:shadow-[#2ec4b6] uppercase text-base font-normal"
          >
            Create Election
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddElections;
