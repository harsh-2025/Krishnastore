import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../components/CartProduct'
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import emptycartImage from "../assets/empty.gif"
const Cart = () => {
    const productCartItem = useSelector((state) => state.product.cartItem)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0)
    const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0)
    const handlePayment = async()=>{

        if(user.email){
            
            const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
            const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`,{
              method : "POST",
              headers  : {
                "content-type" : "application/json"
              },
              body  : JSON.stringify(productCartItem)
            })
            if(res.statusCode === 500) return;
  
            const data = await res.json()
  
            toast("Redirect to payment Gateway...!")
            stripePromise.redirectToCheckout({sessionId : data}) 
        }
        else{
          toast("You have not Login!")
          setTimeout(()=>{
            navigate("/login")
          },1000)
        }
      
    }
    return (
      <>
    <div className='p-2 md:p-4 bg-white'>
          <h2 className='text-lg font-bold text-2xl text-slate-600'>Your Cart items</h2>{ productCartItem[0] ? 
          <div className='my-4 flex gap-3'>
                        {/* //display cart items */}
                        <div></div>
              <div className='w-full max-w-3xl '>
                  {
                      productCartItem.map(el => {
                          return (
                              <CartProduct
                                  key={el._id}
                                  id={el._id}
                                  image={el.image}
                                  name={el.name}
                                  category={el.category}
                                  qty={el.qty}
                                  total={el.total}
                                  price={el.price}
                                  description={el.description}
                              />
                          )
                      })
                }
                

                
              </div>



              {/* //total cart items */}

              <div className='w-full max-w-md  ml-auto '>
                  <h2 className='bg-blue-500 text-white p-2 text-lg'>Summary</h2>
                  <div className='flex w-full py-2 text-lg border-b'>
                  <p> Total Quantity : </p>
                  <p className='ml-auto w-32 font-bold'>{totalQty} </p>
                  </div>
                  <div className='flex w-full py-2 text-lg border-b'>
                  <p > Total Amount</p>
                      <p className='ml-auto w-32 font-bold items-left'><span className='text-rose-500'>₹</span> { totalPrice}</p>
                  </div>
                  <button className='bg-rose-500 text-white rounded w-full text-lg font-bold py-2 ' onClick={handlePayment}>Place Order</button>
              </div>
                    </div>
                    : <>
                        <div className='flex w-full justify-center items-center flex-col'>
                            <img src={emptycartImage} className='w-full max-w-sm'></img>
                        <p className='text-slate-900 text-3xl font-bold'> Empty Cart</p>
                        </div></>
            }
            </div >
            
    </>
  )
}

export default Cart
