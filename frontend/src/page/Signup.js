import React from "react";
import loginsignup from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";
function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate()
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState(
        {
            firstName: "",
            lastName: "",
            password: "",
            confirmpassword: "",
            email: "",
            image:"",
        }
    );
    // console.log(data);
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
    const handleonChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]:value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const { firstName, email, password, confirmpassword } = data
        if (firstName && email && password && confirmpassword) {
          if (password === confirmpassword) {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
              method: "POST",
              headers: {
                "Content-Type":"application/json"
              },
              body:JSON.stringify(data)
            })
            const dataRes = await fetchData.json()
            // console.log(dataRes)
            if (!dataRes.alert) {
              toast("Email is registered")
            }
            else {
              toast("Registered Successfully")
                              navigate("/login") 

            }
            }
            else {
                toast("Passwords are not same")
            }
        }
        else {
            alert("please enter all details")
        }
    };
    const handleUploadProfileImage = async(e) => {
        const data = await ImagetoBase64(e.target.files[0])
        // console.log(data);
        setData((preve) => {
            return {
                ...preve,
                image:data
            }
        })
    }
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        <h1 className="text-center text-2xl font-bold">Sign up</h1>
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto realtive ">
                  
                  <img src={data.image? data.image:loginsignup} className="w-full h-full" />
                  <label htmlFor="profileImage">
                  <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                      <p className="text-sm p-1 text-white ">Upload</p>
                      </div>
                  <input type={"file"} id="profileImage" accept="image/" className="hidden" onChange={handleUploadProfileImage}/>
                  </label>
                      
        </div>
        <form className="w-full py-2 flex flex-col "onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.firstName} onChange={handleonChange}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 w-full mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.lastName} onChange={handleonChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 w-full mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.email} onChange={handleonChange}
          />
          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 bg-slate-200 rounded focus-within:outline focus-within:outline-blue-300 ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full  bg-slate-200  border-none outline-none " value={data.password} onChange={handleonChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 bg-slate-200 rounded outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              className=" w-full  bg-slate-200  border-none outline-none "value={data.confirmpassword} onChange={handleonChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button type="submit" className="w-full max-w-[150px] m-auto bg-rose-700 hover:bg-green-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign Up
          </button>
              </form>
        <p className="text-left text-sm mt-2">Already have account ? <Link to={"/login"} className="text-rose-700 underline">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
