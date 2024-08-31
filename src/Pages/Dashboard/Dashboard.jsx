import { FaUserAlt } from "react-icons/fa";
import {NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
      <div className="max-w-7xl m-auto relative lg:flex flex-nowrap flex-col md:flex-row my-3 lg:my-10 min-h-96">
        <div className="lg:w-[20%] px-3 overflow-y-auto bg-transparent dark:bg-gray-800">
      
        <ul className="space-y-2 font-medium menu-horizontal gap-1 flex-wrap justify-center lg:menu">
    <li>
        <NavLink 
            to={"/dashboard/users"}  
            className={({ isActive }) => 
                `flex items-center py-3 px-6 text-sm font-medium uppercase tracking-widest duration-300 border-2 group border-[#002a3f] ${isActive ? '!bg-[#002a3f] !text-white hover:!bg-[#2ec4b6] hover:!text-[#002a3f] hover:!border-[#2ec4b6]' : 'hover:bg-[#002a3f] hover:text-white hover:border-[#2ec4b6]'}`
            }
        >
            <FaUserAlt className="text-[#2ec4b6] text-xl group-hover:text-white" />
            <span className="ms-3">Users</span>
        </NavLink>
    </li>
</ul>


   </div>

        <div className="lg:w-[80%] px-3 min-h-96 lg:border-4 lg:border-black">
          <div className="lg:py-3 mb-3 ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Dashboard;