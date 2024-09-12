import { Link } from "react-router-dom";
import Testimonial from "../../Component/Testimonial";
import Logo from "/Logo-01.png";
import BG from "/src/assets/BG.jpg";
const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero bg-center bg-cover"
        style={{
          backgroundImage: `url(${BG})`,
        }}
      >
        <div className="hero-overlay bg-opacity-90"></div>
        <div className="flex flex-col-reverse md:flex-row md:justify-around gap-5 p-5 items-center max-w-screen-xl m-auto min-h-[100vh] py-10">
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-5xl  text-white font-bold">
              Welcome to the
              <span className="text-[#2ec4b6]"> Computer Club </span> Voting
              Platform
            </h1>
            <p className="py-6 text-[#fafafa]">
              Join the voting platform that simplifies election management and
              ensures your vote counts in every election
            </p>
            <Link to={'/evm'}><button className="btn shadow border-[#2ec4b6] bg-[#2ec4b6] text-[#002a3f] hover:text-[#2ec4b6] hover:border-[#002a3f] hover:bg-[#002a3f] duration-500 m-2  hover:scale-110 text-sm hover:shadow-[#2ec4b6]">
              View Elections
            </button></Link>
            <button className="btn shadow border-[#2ec4b6] bg-[#2ec4b6] text-[#002a3f] hover:text-[#2ec4b6] hover:border-[#002a3f] hover:bg-[#002a3f] duration-500 m-2  hover:scale-110 text-sm hover:shadow-[#2ec4b6]">
              Admin Login
            </button>
          </div>
          <div className="md:w-1/2">
            <img src={Logo} className="w-3/6 md:w-3/4 md:m-auto" />
          </div>
        </div>
      </div>

      {/* How It Work*/}
      <div className="my-14 max-w-screen-xl m-auto p-10">
        <div>
          <h3 className="text-3xl m-auto text-center text-[#1f1f1f]">
            How It Works
          </h3>
          <div className=" w-1/2 md:w-[15%] h-1 bg-[#002a3f] rounded-full m-auto" />
        </div>

        <div className="my-10 grid md:grid-cols-3 gap-10">
          <div className="card rounded-lg relative bg-base-100 border border-[#002a3f] group hover:shadow-[0px_15px_30px_rgba(0,42,63,0.4)] hover:border-transparent hover:scale-105 transform transition duration-500 hover:bg-[#002a3f] hover:text-white">
            <div className="text-2xl md:text-4xl font-black text-[#002a3f] h-16 md:h-20 w-16 md:w-20 rounded-full border border-[#002a3f] absolute bg-white -top-6 md:-top-9 -left-4 md:-left-6 duration-500 group-hover:border-transparent grid justify-center items-center ">
              <p>1st</p>
            </div>
            <div className="card-body">
              <h2 className="card-title text-xl md:text-2xl font-bold duration-500 group-hover:text-white text-[#002a3f]">
                Create Elections
              </h2>
              <p>
                Admins can easily set up and manage elections for any position
                in the CSE Department.
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>

          <div className="card rounded-lg relative bg-base-100 border border-[#002a3f] group hover:shadow-[0px_15px_30px_rgba(0,42,63,0.4)] hover:border-transparent hover:scale-105 transform transition duration-500 hover:bg-[#002a3f] hover:text-white">
            <div className="text-2xl md:text-4xl font-black text-[#002a3f] h-16 md:h-20 w-16 md:w-20 rounded-full border border-[#002a3f] absolute bg-white -top-6 md:-top-9 -left-4 md:-left-6 duration-500 group-hover:border-transparent grid justify-center items-center ">
              <p>2nd</p>
            </div>
            <div className="card-body">
              <h2 className="card-title text-xl md:text-2xl font-bold duration-500 group-hover:text-white text-[#002a3f]">
                Vote Securely
              </h2>
              <p>
                Students can log in using their university credentials and cast
                their votes securely.
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>

          <div className="card rounded-lg relative bg-base-100 border border-[#002a3f] group hover:shadow-[0px_15px_30px_rgba(0,42,63,0.4)] hover:border-transparent hover:scale-105 transform transition duration-500 hover:bg-[#002a3f] hover:text-white">
            <div className="text-2xl md:text-4xl font-black text-[#002a3f] h-16 md:h-20 w-16 md:w-20 rounded-full border border-[#002a3f] absolute bg-white -top-6 md:-top-9 -left-4 md:-left-6 duration-500 group-hover:border-transparent grid justify-center items-center ">
              <p>3rd</p>
            </div>
            <div className="card-body">
              <h2 className="card-title text-xl md:text-2xl font-bold duration-500 group-hover:text-white text-[#002a3f]">
                Track Results
              </h2>
              <p>
                View real-time results and detailed reports for each election.
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}

      <div className="bg-[#002a3f] py-16 px-5">
        <div className="max-w-screen-xl m-auto grid md:grid-cols-2 gap-5 items-center">
          <div>
            <h3 className="text-white font-light text-3xl md:text-6xl leading-snug">
              Why Choose <br />
              Our <span className="font-bold text-[#2ec4b6]">Voting</span>{" "}
              <br />
              Platform?
            </h3>
          </div>

          <div className="bg-[#00131c73] py-12 px-10 md:rounded-tr-[50px]">
            <h4 className="text-center text-2xl md:text-3xl mb-4 text-white">
              Robust Security
            </h4>
            <p className="text-[#dbdbdb] md:text-justify">
              We prioritize your privacy with end-to-end encryption, ensuring
              every vote is securely transmitted and anonymous. Multi-factor
              authentication (MFA) adds an extra layer of protection for admin
              logins and voter access, preventing unauthorized entry. Our
              platform also maintains data integrity with stringent protocols,
              safeguarding against tampering and duplicate voting.
            </p>
          </div>

          <div className="bg-[#00131c73] py-12 px-10 md:rounded-bl-[50px]">
            <h4 className="text-center text-2xl md:text-3xl mb-4 text-white">
              Real-Time Transparency
            </h4>
            <p className="text-[#dbdbdb] md:text-justify">
              Our platform provides real-time election updates, keeping everyone
              informed as votes are cast. Instant results build trust, while
              detailed post-election reports and an audit trail ensure a
              transparent and fair voting process.
            </p>
          </div>

          <div className="bg-[#00131c73] py-12 px-10 md:rounded-br-[50px]">
            <h4 className="text-center text-2xl md:text-3xl mb-4 text-white">
              Seamless User Experience
            </h4>
            <p className="text-[#dbdbdb] md:text-justify">
              Designed for ease of use, our platform offers a straightforward,
              user-friendly interface. It’s mobile-optimized, allowing voting
              from any device, anywhere, ensuring maximum participation and
              accessibility.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="my-16 max-w-screen-xl m-auto">
        <div>
          <h3 className="text-3xl m-auto text-center text-[#1f1f1f]">
          What Our Users Say
          </h3>
          <div className=" w-1/2 md:w-[15%] h-1 bg-[#002a3f] rounded-full m-auto" />
        </div>

        <Testimonial></Testimonial>
      </div>

      {/* footer part */}
      <div className="bg-[#002a3f]">
      <footer className="footer max-w-screen-xl m-auto text-neutral-content justify-center items-center p-4">
  <div className="grid-flow-col items-center">
    <img className="max-w-16" src={Logo} alt="Computer Club KYAU" />
    <p>Copyright © {new Date().getFullYear()} - All right reserved and Developed By <a className="text-[#2ec4b6]" target="_blank" href="https://asif-talukder.vercel.app/">Asif Talukder</a></p>
  </div>
</footer>
      </div>
    </div>
  );
};

export default HomePage;
