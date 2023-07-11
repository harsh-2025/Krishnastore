import React, { useState } from 'react'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast'
const Newproduct = () => {
  
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description:""
  })
  const handleonChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const uploadImage = async(e) => {

    const data = await ImagetoBase64(e.target.files[0])
    // console.log(data)
    setData((preve) => {
      return {
        ...preve,
        image:data
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    // console.log(data) 

    const { name, image, category, price } = data
    if (name && image && category && price) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`, {
        method: "POST",
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify(data)
      })
      const fetchRes = await fetchData.json()
      // console.log(fetchRes)
      toast("Uploaded Successfully")
      setData(() => {
        return {
          name: "",
    category: "",
    image: "",
    price: "",
    description:""
        }
      })
    }
    else {
      toast("Enter all the fields")
    }
    
  }
  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"} name='name' className='bg-slate-200 p-1 my-1' onChange={handleonChange} value={data.name}/>
       <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleonChange} value={data.category}>
          <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icecream"}>Icecream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"cake"}>Cake</option>



        </select>

        <label htmlFor='image'>Image
        <div id='image' className='h-40 w-full bg-slate-200 my-1 flex items-center cursor-pointer justify-center rouunded'>
            {
              data.image ? <img src={data.image} className='h-full'/> : <span className='text-5xl'><BsCloudUpload /></span>
            }
            
            
          <input type={"file"} accept='image/*' id='image' onChange={uploadImage}  />
          </div>
          </label>
        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' onChange={handleonChange} value={data.price}/>
        <label htmlFor='description'>Description</label>
        <textarea row={2} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleonChange} value={data.description}></textarea>
        <button className='bg-rose-700 hover:bg-green-500 text-white hover:text-black text-lg font-medium my-2 drop-shadow w-full'>Save</button>
      </form>
    </div>
  )
}

export default Newproduct
