import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../components/AllProduct";
import { addCartItem } from "../redux/productSlide";
import { toast } from "react-hot-toast";

const Menu = () => {
  const { filterby } = useParams();
  const dispatch = useDispatch();
  const ProductData = useSelector(state => state.product.productList);
  // console.log(ProductData)
  const productDisplay = ProductData.filter((el) => el._id === filterby)[0];
  // console.log(productDisplay);
  const navigate = useNavigate();
  const handleAddCartProduct = (e) => {
    e.stopPropagation()
    dispatch(addCartItem(productDisplay));
  };
  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate("/cart");
  };
  return (
    <div className="p-2 md:4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm overflow-hidden cursor-pointer w-full p-5">
          <img
            src={productDisplay.image}
            className="hover:scale-105 bg-slate-200 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl ">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500 font-medium md:text-2xl">
            {productDisplay.category}
          </p>
          <p className=" font-bold">
            <span className="text-red-500">₹</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className="flex gap-3">
            <button
              className="bg-yellow-500 py-1 mt-2 rounded  hover:bg-yellow-600 hover:text-xl min-w-[100px]"
              onClick={handleBuy}
            >
              Buy
            </button>
            <button
              onClick={handleAddCartProduct}
              className="bg-yellow-500 py-1 mt-2 rounded  hover:bg-yellow-600 hover:text-xl min-w-[100px]"
            >
              Add to Cart
            </button>
          </div>
          <div className="">
            <p className="text-slate-600 font-medium">Description : </p>
            <p className="">{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={"Related Product"} />
    </div>
    // <div>hairah</div>
  );
};

export default Menu;
