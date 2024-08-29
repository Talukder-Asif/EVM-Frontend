import { useState } from "react";

const Signin = () => {
  const [signUp, setSignUp] = useState(false);
  const handleSignin = (e) =>{
    e.preventDefault();
    const from = e.target;
    const email = from.email.value;
    const password = from.password.value;
    console.log(email, password)
  }


const handleSignup = (e) =>{
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const batch = from.batch.value;
    const studentID = from.studentID.value;
    const password = from.password.value;

    console.log(name, email, password, batch, studentID)
  
}

  return (
    <div className="max-w-screen-xl m-auto min-h-[80vh]">
      <div className="mx-auto p-5 mt-40 md:w-3/4 w-full overflow-hidden rounded-lg  bg-white dark:border-[#002a3f] dark:bg-zinc-900">
        <div
          className={`flex select-none gap-2 border-b p-2.5 *:flex-1 *:rounded-md *:border *:p-2 *:text-center *:uppercase *:shadow-inner *:outline-none dark:border-[#002a3f] *:dark:border-[#002a3f] ${
            signUp
              ? "last-of-type:*:bg-[#002a3f] last-of-type:*:text-white"
              : "first-of-type:*:bg-[#002a3f] first-of-type:*:text-white"
          }`}
        >
          <button onClick={() => setSignUp(false)}>signin</button>
          <button onClick={() => setSignUp(true)}>signup</button>
        </div>

        <div className="w-full flex-col items-center overflow-hidden p-4 sm:p-8">
          {/* sign up form  */}
          <form onSubmit={handleSignup}
            className={`${
              signUp ? "h-full duration-300" : "invisible h-0 opacity-0"
            } space-y-3 sm:space-y-5`}
          >
            <h1 className="mb-6 uppercase backdrop-blur-sm sm:text-2xl">
              Sign Up
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
              <input
                type="file"
                placeholder="Student ID"
                className="file-input file-input-bordered w-full block rounded-md border outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                required
              />
            </div>
            {/* button type will be submit for handling form submission*/}
            
            <div className="text-center">
            <button
              type="submit"
              className="btn shadow w-full md:w-1/2 border-[#002a3f] bg-[#002a3f] text-white hover:text-[#002a3f] hover:border-[#2ec4b6] hover:bg-[#2ec4b6] duration-500 m-2  hover:scale-110 hover:shadow-[#2ec4b6] uppercase text-base font-normal"
            >
              Submit
            </button>
            </div>
            <p className="text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setSignUp(!signUp)}
                className="font-semibold underline"
              >
                Signin
              </button>
            </p>
          </form>

          {/* signin form */}
          <form onSubmit={handleSignin}
            className={`${
              signUp ? "h-0 opacity-0" : "h-full duration-300"
            } space-y-3 sm:space-y-5`}
          >
            <h1 className="mb-3 uppercase sm:mb-5 sm:text-2xl">Sign In</h1>
            <div className="grid md:grid-cols-2 gap-5">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              required
            />
            </div>
            
            
            {/* button type will be submit for handling form submission*/}
            <div className="text-center">
            <button
              type="submit"
              className="btn shadow w-full md:w-1/2 border-[#002a3f] bg-[#002a3f] text-white hover:text-[#002a3f] hover:border-[#2ec4b6] hover:bg-[#2ec4b6] duration-500 m-2  hover:scale-110 hover:shadow-[#2ec4b6] uppercase text-base font-normal"
            >
              Submit
            </button>
            </div>
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setSignUp(!signUp)}
                type="button"
                className="font-semibold underline"
              >
                Signup
              </button>
            </p>
          </form>

          <div className="mt-3 space-y-3 sm:space-y-5">
            <hr className="border-[#002a3f]" />
            <button className="mx-auto mb-4 mt-8 block rounded-md border px-5 py-2 shadow-lg duration-200 hover:bg-zinc-400/10 dark:border-[#002a3f] dark:hover:bg-[#002a3f] dark:hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="mr-2 inline-block h-5 w-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
