import { useAppSelector } from "../app/hooks";
import {Product} from "../interfaces/product"

const PaymentInfo = () =>{
    let total = 0
    const {cart} = useAppSelector((state)=>state.cart)
    cart.forEach((item:Product)=>total+=item.price * item.quantity)
    return(
        <section className="py-16 xs:px-8 sm:px-16 grid grid-cols-12 xs:gap-y-8 xs:gap-x-0 sm:gap-8">
             <div className="xs:col-span-12 sm:col-span-6 md:col-span-4 p-7 bg-ligthbgColor h-fit rounded-md">
                <div className="mb-5 border-b-[1px] border-[#ddd]">
                    <p className="flex justify-between text-darkerText mb-3">
                        <span>SubTotal:</span>
                        <span>${total}</span>
                    </p>
                    <p className="flex justify-between text-darkerText mb-3">
                        <span>Shipping:</span>
                        <span>$30</span>
                    </p>
                </div>
                <p className="flex justify-between font-bold text-darkerText mb-3">
                        <span>Total:</span>
                        <span>${total + 30}</span>
                </p>
             </div>
             <div className="xs:col-span-12 sm:col-span-6 md:col-span-8">
                <h3 className="text-darkerText text-xl mb-6">Shipping Address</h3>
                <form className="w-full flex flex-col gap-5">
                    <input 
                        type="text"
                        placeholder="Enter Your Name"
                        className="inputStyle"
                    />
                    <input 
                        type="text"
                        placeholder="Enter Your Email"
                        className="inputStyle"
                    />
                    <input 
                        type="text"
                        placeholder="Phone Number"
                        className="inputStyle"
                    />
                    <input 
                        type="text"
                        placeholder="Country"
                        className="inputStyle"
                    />
                    <input 
                        type="text"
                        placeholder="City"
                        className="inputStyle"
                    />
                    <input 
                        type="text"
                        placeholder="Postal Code"
                        className="inputStyle"
                    />
                    <button className="btnStyle w-fit">
                        Payment
                    </button>
              </form>
             </div>
        </section>
    )
}
export default PaymentInfo;