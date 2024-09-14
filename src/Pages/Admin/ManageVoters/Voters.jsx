import { MdDeleteOutline, MdOutlineSettings } from "react-icons/md";
import useDepartment from "../../../Hooks/useDepartment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../Config/firebase.config";
import { v4 } from "uuid";
import imageCompression from "browser-image-compression";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAllVoters from "../../../Hooks/useAllVoters";
import profilepic from "/src/assets/Man1.png";
const Voters = () => {
  const [Department, isDepartmentLoading] = useDepartment();
  const [voter, isVoterLoading, refetch] = useAllVoters();
  const [openModal, setOpenModal] = useState(false);
  const [accountType, setAccountType] = useState("Student");
  const [department, setDepartment] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [openImg, setOpenImg] = useState(false);
  const [openImgUrl, setOpenImgUrl] = useState(null);

  const [showDept, setShowDept] = useState("Department");
  const [selectDept, setSelectDept] = useState(null);
  const [showBatch, setShowBatch] = useState("Batch");
  const [filterVoter, setFilterVoter] = useState(null);


  
  useEffect(() => {
    let filteredVoters = voter?.slice(); 

    // Filter by department
    if (showDept !== "Department") {
      filteredVoters = filteredVoters?.filter(
        (e) => e?.department === showDept
      );
      setSelectDept(Department?.find((f) => f.department === showDept));
    }

    // Further filter by batch if applicable
    if (showBatch !== "Batch") {
      filteredVoters = filteredVoters?.filter((e) => e?.batch === showBatch);
    }

    // Further filter by department is not if applicable
    if (showDept === "Department") {
      filteredVoters = voter?.slice();
      setSelectDept(null);
    }

    if (showBatch === "Batch" && showDept !== "Department") {
      filteredVoters = voter?.filter((e) => e?.department === showDept);
    }

    setFilterVoter(filteredVoters);
  }, [voter, showDept, showBatch, Department]);




  const handleAddVoter = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!imageUpload) {
      const voterData = {
        name: form.name?.value,
        accountType: form.accountType?.value,
        department: form.department?.value,
        batch: form.batch?.value,
        studentID: form.studentID?.value,
        photoURL: null,
        OTP: "",
      };
      return axiosSecure.post("/voter", voterData).then((res) => {
        console.log(res.data);
        if (res?.data?.acknowledged) {
          form.reset();
          refetch();
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
          refetch();
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
  if (isDepartmentLoading || isVoterLoading) {
    return <div>Loading...</div>;
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
                    </>
                  )}
                  <input
                    type="number"
                    placeholder={
                      accountType === "Student" ? "Student ID" : "Teachers ID"
                    }
                    name="studentID"
                    className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                    required
                  />

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

              <th>
                <select
                  onChange={(e) => {setShowDept(e.target.value); setShowBatch("Batch");
                    setSelectDept(null)}}
                  defaultValue={"Department"}
                  className="select w-full max-w-xs"
                >
                  <option>Department</option>
                  {Department?.map((d, i) => (
                    <option key={i} value={d?.department}>
                      {d?.department}
                    </option>
                  ))}
                </select>
              </th>

              <th>
                <select
                  onChange={(e) => setShowBatch(e.target.value)}
                  defaultValue={"Batch"}
                  className="select w-full max-w-xs"
                  disabled={!selectDept}
                >
                  <option>Batch</option>
                  {selectDept?.batch?.map((dept, i) => (
                    <option key={i}>
                      {dept}
                    </option>
                  ))}
                </select>
              </th>

              <th>Buttons</th>
            </tr>
          </thead>
          <tbody>
            {filterVoter?.map((data, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3 justify-start">
                    <div className="h-14 w-14 flex justify-center items-center rounded-lg bg-gray-200 overflow-hidden">
                      <img
                        onClick={() => {
                          setOpenImg(true);
                          setOpenImgUrl(
                            data?.photoURL ? data.photoURL : profilepic
                          );
                        }}
                        src={data?.photoURL ? data.photoURL : profilepic}
                        alt={data?.name}
                        className="w-full object-contain"
                      />
                    </div>

                    <p>
                      {data?.name} <br />
                      {data?.studentID}
                    </p>

                    <div
                      onClick={() => setOpenImg(false)}
                      className={`fixed flex justify-center items-center z-[100] ${
                        openImg ? "visible opacity-1" : "invisible opacity-0"
                      } inset-0 w-full h-full bg-[#ffffff0d] backdrop-blur-sm duration-100`}
                    >
                      <div
                        onClick={(e_) => e_.stopPropagation()}
                        className={`absolute drop-shadow-2xl rounded-lg ${
                          openImg
                            ? "opacity-1 duration-300 translate-y-0"
                            : "-translate-y-20 opacity-0 duration-150"
                        } group overflow-hidden`}
                      >
                        {/* close button */}
                        <svg
                          onClick={() => setOpenImg(false)}
                          className="w-10 mx-auto hover:opacity-60 absolute right-0 drop-shadow-[0_0_10px_black] cursor-pointer"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                              fill="#fff"
                            ></path>
                          </g>
                        </svg>
                        {/* image */}
                        <img
                          src={openImgUrl}
                          alt={data?.name}
                          className="min-w-[300px] md:min-w-[500px] min-h-[200px] md:min-h-[350px] bg-black/50"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>Department of {data?.department}</td>
                <td>{data?.batch ? data.batch : "Teacher"}</td>
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
        {filterVoter?.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-32">
            <h1 className="text-center text-3xl font-bold">No Voters Found</h1>
            <p className="text-center text-gray-600">
              No voters found in the selected department and batch.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Voters;
