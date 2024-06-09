import { Rating } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { addToCart } from "../features/cartSlice";
import { useAppSelector,useAppDispatch } from '../app/hooks';
import {Product} from "../interfaces/product"


const ProductCart = ({product}:{product:Product}) =>{

    const { id, title, image, price,category,rating } = product;
    const {cart} = useAppSelector((state)=>state.cart)
    const dispatch = useAppDispatch()

    const checkINCart = (productId:number) =>{
       let check = false
       cart.forEach((item:Product)=>{
        if(item.id==productId){
            check=true
        }
       })
       return check;
    }

    return(
        <div className="productStyle group">
            <img
               alt="product-img"
               loading="lazy"
               src={image}
               className="h-[120px] w-[120px] rounded-[50%] transition duration-500 group-hover:scale-[1.125]"
            />
            <p className="w-full text-darkerText truncate text-[16px] mb-0 text-center">
                {title}
            </p>
            <p className="w-full mb-0 flex justify-between items-center">
                <span className="font-bold">Rating:</span>
                <Rating
                    value={rating.rate}
                    readOnly
                    precision={0.5}
                    size='small'
                    icon={<FavoriteIcon fontSize='inherit' color='error' />}
                    emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
                />
            </p>
            <p className="w-full mb-0 flex justify-between items-center">
                <span className="font-bold">Category:</span>
                <span>{category}</span>
            </p>
            <div className="w-full flex flex-wrap items-center justify-between gap-[20px]">
                <p className="text-mainColor font-bold">${price}</p>
                {
                    checkINCart(id)?
                    <button className="btnStyle text-[15px] py-1">IN Cart</button>
                    :
                    <button 
                        className="btnStyle text-[15px] py-1"
                        onClick={()=>dispatch(addToCart({
                            ...product,
                            quantity:1
                        }))}
                        >
                           Add To Cart
                    </button>
                }
                
            </div>
        </div>
    )
}
export default ProductCart;