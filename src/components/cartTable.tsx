import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch,useAppSelector } from "../app/hooks";
import { removeFromCart } from "../features/cartSlice";
import { Link } from "react-router-dom";
import { Product } from "../interfaces/product";

const CartTable = () =>{

    const {cart} = useAppSelector((state)=>state.cart)
    const dispatch = useAppDispatch();
    let total = 0

    return(
        <section className="py-16 xs:px-8 sm:px-16">
            {
                cart.length?
                <React.Fragment>
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[600px] w-full overflow-hidden rounded-md mb-10">
                            <thead>
                                <tr className="border-[#ddd] text-center bg-darkerText text-white">
                                    <th className="p-2 border-x-[1px]">Image</th>
                                    <th className="p-2 border-x-[1px]">Product Title</th>
                                    <th className="p-2 border-x-[1px]">Price</th>
                                    <th className="p-2 border-x-[1px]">Quantity</th>
                                    <th className="p-2 border-x-[1px]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((item:Product)=>{
                                        total+=item.price*item.quantity
                                        return(
                                            <tr className="border-[#ddd] text-center" key={item.id}>
                                                <td className="flex justify-center p-2 border-x-[1px] border-y-[1px]">
                                                    <img 
                                                    alt="cart-img"
                                                    loading="lazy"
                                                    src={item.image}
                                                    className="w-[80px] h-[80px]"
                                                    />
                                                </td>
                                                <td className="p-2 border-x-[1px] border-y-[1px]">{item.title}</td>
                                                <td className="p-2 border-x-[1px] border-y-[1px]">${item.price}</td>
                                                <td className="p-2 border-x-[1px] border-y-[1px]">{item.quantity}</td>
                                                <td className="p-2 border-x-[1px] border-y-[1px]">
                                                    <button 
                                                      onClick={()=>dispatch(removeFromCart(item.id))}
                                                      className="btnStyle py-2 text-sm"
                                                    >
                                                        <span className="mr-2">Delete</span>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h3 className="text-xl text-left font-bold">
                           <span className="mr-2 text-darkerText">SubTotal:</span>
                           <span className="text-mainColor">${total}</span>
                        </h3>
                        <p className="text-darkText text-left text-[16.1px]">
                           Taxes and shipping will calculate at checkout
                        </p>
                        <button className="btnStyle text-sm w-fit">
                            <Link to={"/"}>Continue Shopping</Link>
                        </button>
                    </div>
                </React.Fragment>
                :
                <h3 className="w-full text-darkerText text-2xl text-center">
                    There IS NO Items IN The Cart
                </h3>
            }
        </section>
    )
}
export default CartTable;