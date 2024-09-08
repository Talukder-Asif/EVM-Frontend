import { MdDeleteOutline, MdOutlineSettings } from "react-icons/md";
import useDepartment from "../../../Hooks/useDepartment";
import { useState } from "react";
import Swal from "sweetalert2";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../Config/firebase.config";
import { v4 } from "uuid";
import imageCompression from "browser-image-compression";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAllVoters from "../../../Hooks/useAllVoters";

const Voters = () => {
  const [Department, isDepartmentLoading, refetch] = useDepartment();
  const [voter, isVoterLoading] = useAllVoters();
  const [openModal, setOpenModal] = useState(false);
  const [accountType, setAccountType] = useState("Student");
  const [department, setDepartment] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const axiosSecure = useAxiosSecure();

  console.log(voter);

  const handleAddVoter = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!imageUpload) {
      return Swal.fire({
        title: `Please upload ${form?.name?.value}'s picture`,
        showConfirmButton: false,
        timer: 1500,
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

      const voterData = {
        name: form.name?.value,
        accountType: form.accountType?.value,
        department: form.department?.value,
        batch: form.batch?.value,
        studentID: form.studentID?.value,
        photoURL: imageURL,
        OTP: "",
      };
      axiosSecure.post("/voter", voterData).then((res) => {
        console.log(res.data);
        if (res?.data?.acknowledged) {
          form.reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Voter's Information Added",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: "Error during add",
            text: res?.data,
            icon: "error",
          });
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error during add",
        text: error.message,
        icon: "error",
      });
    }
  };

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
                    defaultValue={"Choice Department"}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option disabled>Choice Department</option>
                    {Department?.map((d, i) => (
                      <option key={i} value={d?.department}>
                        {d?.department}
                      </option>
                    ))}
                  </select>

                  {accountType === "Student" && (
                    <>
                      <select
                        name="batch"
                        className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                        required
                        disabled={department === null}
                        defaultValue={"Batch"}
                      >
                        <option disabled>Batch</option>
                        {Department?.find(
                          (e) => e?.department === department
                        )?.batch?.map((data, i) => (
                          <option key={i} value={data}>
                            {data}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Student ID"
                        name="studentID"
                        className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                        required
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
              <th>Name and ID</th>
              <th>Department</th>
              <th>Batch</th>
              <th>Buttons</th>
            </tr>
          </thead>
          <tbody>
            {voter?.map((data, i) => (
              <tr key={i}>
                <th>{i+1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={data?.photoURL}
                          alt={data?.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data?.name}</div>
                      <div className="text-sm opacity-90">{data?.studentID}</div>
                    </div>
                  </div>
                </td>
                <td>Department of {data?.department}</td>
                <td>{data?.batch}</td>
                <td className="text-center">
      <button className="text-white mx-1 bg-[#002a3f] w-auto py-1 px-4 text-2xl rounded hover:bg-[#2ec4b6] hover:text-[#002a3f] duration-300"><MdOutlineSettings /></button>

      <button className="text-white mx-1 bg-red-600 w-auto py-1 px-4 text-2xl rounded hover:bg-red-700 duration-300"><MdDeleteOutline /></button>
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
