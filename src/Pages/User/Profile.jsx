import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useUserDetails from "../../Hooks/useUserDetails";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Config/firebase.config";
import { v4 } from "uuid";
import imageCompression from "browser-image-compression";

const Profile = () => {
  const [user, isUserLoading, refetch] = useUserDetails();
  const { updateUser } = useContext(AuthContext);
  const axiosPrivate = useAxiosSecure();
  const [accountType, setAccountType] = useState(
    user?.accountType ? user.accountType : "Student"
  );
  const [imageUpload, setImageUpload] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const batch = form?.batch ? form.batch.value : "";
    const studentID = form?.studentID ? form.studentID.value : "";
    const department = form.department.value;
    const photoURL = user?.photoURL;

    if (!imageUpload) {
      updateUser(name, photoURL);

      const userData = {
        name,
        email: user?.email,
        photoURL: photoURL,
        role: user?.role,
        batch,
        studentID,
        accountType,
        department,
      };

      return await axiosPrivate
        .put(`/user/${user?.email}`, userData)
        .then((res) => {
          if (res?.data?.modifiedCount) {
            form.reset();
            setImageUpload(null);
            refetch();

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Profile updated successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }

    try {
      const compressedImage = await imageCompression(imageUpload, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      });

      const imageRef = ref(storage, `users/${compressedImage.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, compressedImage);
      const imageURL = await getDownloadURL(snapshot.ref);

      updateUser(name, imageURL);

      const userData = {
        name,
        email: user?.email,
        photoURL: imageURL,
        role: user?.role,
        batch,
        studentID,
        accountType,
        department,
      };

      await axiosPrivate.put(`/user/${user?.email}`, userData).then((res) => {
        if (res?.data?.modifiedCount) {
          form.reset();
          setImageUpload(null);
          refetch();

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Profile updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      console.error("Error during update:", error.message);
      Swal.fire({
        title: "Error during update",
        text: error.message,
        icon: "error",
      });
    }
  };

  if (isUserLoading) {
    return (
      <div className="grid min-h-[400px] content-center justify-center">
        {/* Loading spinner and message */}
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-5 text-4xl md:text-5xl lg:text-5xl text-gray-900 font-bold">
        My Profile
      </h3>
      <div className="flex gap-10 flex-wrap">
        <img className="w-40 h-40 rounded-full" src={user?.photoURL} alt="" />
        <div>
          <h3 className="text-lg mb-5 md:text-xl text-gray-900 lg:text-3xl font-bold">
            Account Type: {user?.accountType || "Not Defined"}
          </h3>
          <h3 className="text-lg mb-5 md:text-xl text-gray-900 lg:text-3xl font-bold">
            Full Name: {user?.name}
          </h3>
          {user?.accountType === "Student" && (
            <>
              <h3 className="text-lg mb-5 md:text-xl text-gray-900 lg:text-3xl font-bold">
                Student ID: {user?.studentID}
              </h3>
              <h3 className="text-lg mb-5 md:text-xl text-gray-900 lg:text-3xl font-bold">
                Department: {user?.department || "Not Defined"}
              </h3>
              <h3 className="text-lg mb-5 md:text-xl text-gray-900 lg:text-3xl font-bold">
                Batch: {user?.batch}
              </h3>
            </>
          )}
          <h3 className="text-lg mb-5 md:text-xl text-gray-900 lg:text-3xl font-bold">
            Email: {user?.email}
          </h3>
          <h3 className="text-lg mb-5 md:text-xl text-gray-900 lg:text-3xl font-bold">
            Role:{" "}
            <span className="border-b-4 border-b-[#eb0029]">{user?.role}</span>
          </h3>
        </div>
      </div>

      <h3 className="my-5 text-4xl md:text-5xl lg:text-5xl text-gray-900 font-bold">
        Update Profile
      </h3>
      <form onSubmit={handleUpdate} className="h-full duration-300">
        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="name"
            defaultValue={user?.name}
            placeholder="Name"
            className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
            required
          />

          <select
            name="accountType"
            defaultValue={user?.accountType} // This sets the default selected value
            onChange={(e) => setAccountType(e.target.value)}
            className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
            required
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>

          <select
            name="department"
            defaultValue={user?.department} // This sets the default selected value
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
                defaultValue={user?.batch}
                placeholder="Batch No"
                className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                required
              />
              <input
                type="number"
                name="studentID"
                defaultValue={user?.studentID}
                placeholder="Student ID"
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
  );
};

export default Profile;
