import { NavLink } from "react-router-dom";
import Logo from "/src/assets/Logo-01.png"
const NavBar = () => {
  const navItem = (
    <>
      <li className="group flex flex-col">
        <NavLink
          to={"/evm/elections"}
          className={({ isActive, isPending }) =>
            isActive ? "text-[#2ec4b6] font-medium" : isPending ? "text-white font-normal" : "text-white font-normal"
          }
        >
          Elections
        </NavLink>
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#2ec4b6] transition-all duration-300 group-hover:w-full hidden lg:inline z-50"></span>
      </li>
      <li className="group flex flex-col">
        <NavLink
          to={"/evm/signin"}
          className={({ isActive, isPending }) =>
            isActive ? "text-[#2ec4b6] font-medium" : isPending ? "text-white font-normal" : "text-white font-normal"
          }
        >
          Log In
        </NavLink>
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#2ec4b6] transition-all duration-300 group-hover:w-full hidden lg:inline z-50"></span>
      </li>
    </>
  );
  return (
    <div className=" bg-[#002a3f] ">
      <div className="navbar max-w-screen-xl m-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItem}
          </ul>
        </div>
        <NavLink to={"/"}>
          <img src={Logo} className="w-[120px]" />
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center justify-between gap-10">{navItem}</ul>
      </div>
      <div className="navbar-end">
        <NavLink className="btn">Button</NavLink>
      </div>
    </div>
    </div>
  );
};

export default NavBar;
