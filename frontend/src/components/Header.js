import React from "react";
import { useState } from "react";
import logo from "../assets/logo.png";
import "./Header.css";
import { Link , useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  // console.log(userData.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Successfully Logged out");
  };
  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  // console.log(process.env.REACT_APP_ADMIN_EMAIL);
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white ">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img src={logo} className="h-full" />
          </div>
        </Link>
        <div className="flex item-center gap-4 md:gap-7">
          <nav className=" gap-4 md:gap-6 text-base md:text-lg  hidden md:flex">
            <Link to={""} className="hover:text-3xl" >Home</Link>
            <Link to={"menu/64a7df927d6d9d877fb6f543"} className="hover:text-3xl" >Menu</Link>
            <Link to={"about"} className="hover:text-3xl" >About</Link>
            <Link to={"contact"} className="hover:text-3xl" >Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 hover:text-4xl relative " >
            <Link to={"cart"}><BsCartFill />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center ">
              {cartItemNumber.length}
              </div>
              </Link>
          </div>
          <div className=" text-slate-600 relative" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8  rounded-full overflow-hidden drop-shadow-md ">
              {/* <HiOutlineUserCircle /> */}
              {userData.image ? (
                <img src={userData.image} className="w-full h-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col  min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2 hover:text-xl"
                  >
                    New product
                  </Link>
                )}

                {userData.image ? (
                  <p
                    className="cursor-pointer px-2 text-white bg-red-500 hover:bg-green-500 hover:text-xl"
                    onClick={handleLogout}
                  >
                    Logout ({
                      userData.firstName
                    })
                    
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap px-2 cursor-pointer text-xl bg-red-500 text-white hover:bg-green-500  hover:text-3xl"
                  >
                    Login
                  </Link>
                )}
                <nav className="  text-base md:text-lg   flex flex-col md:hidden">
            <Link to={""} className="px-2 py-1 hover:text-3xl">Home</Link>
            <Link to={"menu/64a7df927d6d9d877fb6f543"} className="px-2 py-1 hover:text-3xl">Menu</Link>
            <Link to={"about"} className="px-2 py-1 hover:text-3xl">About</Link>
            <Link to={"contact"} className="px-2 py-1 hover:text-3xl">Contact</Link>
          </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
