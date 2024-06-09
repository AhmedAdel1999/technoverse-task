import { useEffect, useState } from "react";
import { categories } from "../utils/constants";
import ProductCart from "../components/productCart";
import { getAllProducts } from "../features/productSlice";
import { Product } from "../interfaces/product";
import { useAppSelector,useAppDispatch } from "../app/hooks";

const HomePage = () =>{
    const dispatch = useAppDispatch();
    const [search,setSearch] = useState<string>("")
    const [category,setCategory] = useState<string>("")
    const{products} = useAppSelector((state)=>state.product)
    const [productsAfterFilter,setProductsAfterFilter] = useState<Product[]>([])

    useEffect(()=>{
         dispatch(getAllProducts())
    },[])

    useEffect(()=>{
        let finalProducts:Product[] = []
        if(search){
           finalProducts=[...products.filter((item:Product)=>item.title.toLowerCase().includes(search))]
        }
        if(!search){
            finalProducts=[...products]
         }
         if(category){
            finalProducts=[...finalProducts.filter((item:Product)=>item.category==category)]
         }
         setProductsAfterFilter([...finalProducts])
   },[category,search,products.length])
    return(
        <div className="h-full">
            <section className="py-16 xs:px-8 sm:px-16">
                <h3 className="text-darkerText text-3xl font-extrabold mb-10">
                    All OF Our Products
                </h3>
                <div className="flex flex-wrap gap-8 mb-8">
                    <input 
                       className="inputStyle min-w-8 w-[48%]" type="text" value={search}
                       placeholder="search by title"
                       onChange={(e)=>setSearch(e.target.value)} 
                    />
                    <select 
                       className="inputStyle min-w-8 w-[48%]"
                       value={category}
                       onChange={(e)=>setCategory(e.target.value)}
                    >
                        <option value="">Filter By Category</option>
                       {
                          categories.map((item,index)=>{
                            return(
                                <option value={item} key={index}>{item}</option>
                            )
                          })
                       }
                    </select>
                </div>
                <div className="grid justify-items-center grid-cols-12 xs:gap-y-8 xs:gap-x-0 sm:gap-8">
                    {
                        productsAfterFilter.map((product)=>{
                            return(
                                <ProductCart product={product} key={product.id} />
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}
export default HomePage