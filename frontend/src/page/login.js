import React from "react";
import loginsignup from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { loginRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    email: "",
  });
  // console.log(data);
  const userData = useSelector((state) => state);

  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/login`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const dataRes = await fetchData.json();
      // console.log(dataRes);
      toast(dataRes.message);
      if (dataRes.alert) {
        dispatch(loginRedux(dataRes))
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }
      // console.log(userData);
    } else {
      alert("please enter all details");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex items-center m-auto">
          <img src={loginsignup} className="w-full " />
        </div>
        <form className="w-full py-2 flex flex-col " onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 w-full mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleonChange}
          />
          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 bg-slate-200 rounded focus-within:outline focus-within:outline-blue-300 ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full  bg-slate-200  border-none outline-none "
              value={data.password}
              onChange={handleonChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-rose-700 hover:bg-green-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have account ?{" "}
          <Link to={"/signup"} className="text-rose-700 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
