import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem,increaseQty } from '../redux/productSlide'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch()
  const handleAddCartProduct = (e) => {
    e.stopPropagation()
    dispatch(addCartItem({
      _id:id,
      name: name,
      price:price,
      category: category,
      image:image,
    }))
  }
  return (
    <div className='w-full min-w-[200px] max-w-[200px]  py-5 px-4 bg-white hover:shadow-lg cursor-pointer flex flex-col drop-shadow-lg '>
          {
              image ? (<>
                  <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})}>
                  <div className='h-28 flex flex-col justify-center items-center' >
              <img src={image} className='h-full bg-red-500'/>
      </div>
      <h3 className='font-semibold text-slate-600  capitalize overflow-hidden text-lg mt-4 whitespace-nowrap '>{name}</h3>
          <p className=' text-slate-400 font-medium' >{category}</p>
          <p className=' font-bold'><span className='text-rose-500'>₹</span> <span>{price}</span></p></Link>
       <button className='bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 hover:text-xl w-full' onClick={handleAddCartProduct}>Add to Cart</button>
       </> )
                  :(
                    <div className="min-h-[150px] flex justify-center items-center">
                      <p>{loading}</p>
                    </div>
                  )
                  
      }
          
              </div>
          
  )
}

export default CardFeature
