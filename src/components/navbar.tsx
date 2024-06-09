import { useState,useEffect } from "react"
import { useAppDispatch,useAppSelector } from "../app/hooks"
import { NavLink,Link } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars,faTimes,faCartShopping, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../features/cartSlice"
import { Product } from "../interfaces/product"

const Navbar = () =>{

    const dispatch = useAppDispatch()
    const isSmallScreen = useMediaQuery({ maxWidth: 1100 })
    const [scrollPosition, setScrollPosition] = useState(0);
    const[open,setOpen]=useState(false)
    const[openSidebar,setOpenSidebar]=useState(false)
    const{cart} = useAppSelector((state)=>state.cart)
    let total=0

    const navLinks = [
        {display: "Home",path: "/"},
        {display: "Add Product",path: "/addproduct"},
        {display: "Cart",path: "/cart"},
    ];

    const handleScroll = () => {
        const currentPosition = window.scrollY;
        setScrollPosition(currentPosition);
    };

    useEffect(()=>{
       if(!isSmallScreen){
        setOpen(false)
       }
    },[isSmallScreen])
    
    useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
        // Clean up the event listener when component unmounts
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    return(
        <div className={`w-full bg-bgColor py-8 ${scrollPosition>=70?"fixed z-50 top-0 bg-white ":""} flex justify-between items-center py-2 px-16`}>
            <h3 className="text-darkerText text-xl font-extrabold">E-commerce App</h3>
            <nav className={`grow ${!open&&isSmallScreen?"hidden":""} ${open?"block fixed top-0 left-0 h-screen w-[250px] bg-white":""}`}>
                <ul className={`flex justify-center gap-8 ${open?"h-full flex-col justify-center items-center":""}`}>
                    {
                        navLinks.map((item)=>{
                            return(
                                <li key={item.path}>
                                    <NavLink 
                                       onClick={()=>setOpen(false)}
                                       to={item.path}
                                       className={`transition text-darkerText font-[600] [&.active]:text-mainColor hover:text-mainColor`}
                                    >
                                        {item.display}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            <ul className="flex items-center list-none gap-6">
                <li className="relative" onClick={()=>setOpenSidebar(true)}>
                    <FontAwesomeIcon className="iconstyle" icon={faCartShopping} />
                    <span className="cartCount">
                        {cart.length}
                    </span>
                </li>
                {
                    (isSmallScreen)?
                    open?
                    <li onClick={()=>setOpen(!open)}>
                        <FontAwesomeIcon className="iconstyle" icon={faTimes} />
                    </li>
                    :
                    <li onClick={()=>setOpen(!open)}>
                        <FontAwesomeIcon className="iconstyle" icon={faBars} />
                    </li>
                    :
                    null
                }
            </ul>
            {
                openSidebar?
                <div className="fixed right-0 top-0 h-screen xs:max-w-[350px] sm:max-w-[400px] w-full bg-white">
                    <div className="p-5">
                        <div 
                          onClick={()=>setOpenSidebar(false)}
                          className="bg-black w-[30px] h-[30px] rounded-[50%] flex items-center justify-center"
                        >
                           <FontAwesomeIcon className="iconstyle text-white" icon={faTimes} />
                        </div>
                    </div>
                    <div className="h-[calc(100%-150px)] overflow-auto">
                        {
                            cart.length?
                            <div className="flex flex-col gap-y-8 px-5">
                                {
                                    cart.map((item:Product)=>{
                                        total+=item.price * item.quantity
                                        return(
                                            <div key={item.id} className="flex gap-x-2">
                                                <img 
                                                  alt="cart-item"
                                                  loading="lazy"
                                                  src={item.image}
                                                  className="w-[40px] h-[40px]"
                                                />
                                                <div className="w-full flex items-center justify-between">
                                                    <div className="flex flex-col gap-y-3">
                                                        <h6 className="text-darkerText max-w-[150px] truncate text-sm font-bold">
                                                            {item.title}
                                                        </h6>
                                                        <p className="flex justify-between">
                                                            <span className="text-darkText">{item.quantity}x</span>
                                                            <span className="text-mainColor">${item.price}</span>
                                                        </p>
                                                        <p className="bg-ligthbgColor flex items-center justify-between rounded-md py-1 px-2">
                                                            <span onClick={()=>dispatch(increaseQuantity(item.id))}>
                                                                <FontAwesomeIcon className="cursor-pointer" icon={faPlus} />
                                                            </span>
                                                            <span>{item.quantity}</span>
                                                            <span onClick={()=>dispatch(decreaseQuantity({id:item.id,quantity:item.quantity}))}>
                                                                <FontAwesomeIcon className="cursor-pointer" icon={faMinus} />
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div 
                                                      onClick={()=>dispatch(removeFromCart(item.id))}
                                                      className="bg-black w-[20px] h-[20px] rounded-[50%] flex items-center justify-center"
                                                    >
                                                    <FontAwesomeIcon className="iconstyle text-sm text-white" icon={faTimes} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            <h3 className="text-center text-xl font-bold">NO Items IN Cart</h3>
                        }
                    </div>
                    <div className="w-full absolute right-0 bottom-0 bg-mainColor h-[80px] flex items-center p-4">
                        <div className="w-full flex flex-wrap justify-between">
                            <p className="flex items-center">
                                <span className="text-white text-xl mr-2">Subtotal :</span>
                                <span className="text-white text-2xl">${total.toFixed(2)}</span>
                            </p>
                            <button 
                              onClick={()=>setOpenSidebar(false)}
                              className="outline-none border-none rounded-md bg-white px-5 py-1">
                                <Link to={"/cart"}>checkout</Link>
                            </button>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}
export default Navbar