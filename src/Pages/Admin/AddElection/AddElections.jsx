import { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import imageCompression from 'browser-image-compression';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../Config/firebase.config";
import { v4 } from "uuid";

const departments = ["CSE", "EEE", "English", "Pharmacy", "BBA", "MIS", "LAW"];

const AddElections = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const axiosPublic = useAxios();
  const toggleDepartmentSelection = (department) => {
    if (selectedDepartments.includes(department)) {
      setSelectedDepartments(
        selectedDepartments.filter((d) => d !== department)
      );
    } else {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };

  const [imageUpload, setImage] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!imageUpload) {
      return Swal.fire({
        title: "Please upload a picture",
        showConfirmButton: false,
        timer: 1500
      });
    }

    try {
      // Compress the image before uploading
      const compressedImage = await imageCompression(imageUpload, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      });
  
      // Upload the compressed image
      const imageRef = ref(storage, `users/${compressedImage.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, compressedImage);
  
      // Get the download URL
      const imageURL = await getDownloadURL(snapshot.ref);
      
    const form = e.target;
    const formData = {
      electionName: form.electionName.value,
      date: form.date.value,
      departments: selectedDepartments,
      details: form.details.value,
      candidate: [{}],
      voter: [{}],
      status: "Upcoming",
      imageURL,
    };
    console.log(formData);

    // Add your API call here
    axiosPublic.post("/election", formData).then((res) => {
      console.log(res.data);
      if (res.data.acknowledged) {
        setSelectedDepartments([]);
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
  


  
    } catch (error) {
      console.error('Error during signup:', error.message);
      Swal.fire({
        title: 'Error during signup',
        text: error.message,
        icon: 'error',
      });
    }

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
        <label className="form-control w-full">
            <span className="label-text font-semibold">Add an Image</span>
          <input
          onChange={(e)=> setImage(e.target.files[0])}
            type="file"
            className="file-input mt-1 file-input-[#002a3f] border border-[#002a3f] w-full"
          />
        </label>

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
