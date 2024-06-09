import React, {useState} from "react";
import { categories } from "../utils/constants";
import { useAppDispatch } from "../app/hooks";
import { createProduct } from "../features/productSlice";
const AddProduct = () =>{
    
    const dispatch = useAppDispatch();
    const [title,setTitle] = useState<string>("")
    const [price,setPrice] = useState<number>(0)
    const [category,setCategory] = useState<string>("men's clothing")
    const [description,setDescription] = useState<string>("")
    const [productImg,setProductImg] = useState<any>(null)

    const handleProductImg = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const { files} = e.target;
        const selectedFiles = files as FileList;
        setProductImg(selectedFiles[0])
    }

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        dispatch(createProduct({
            product:{
                title,price:Number(price),category,description,
                rating:{
                    rate: Number(((5) * Math.random()).toFixed(1)),
                    count: Number(((600)* Math.random()).toFixed(0))
                }
            },
            productImg
        }))
    }


    return(
        <div className="h-full">
            <section className="py-16 xs:px-8 sm:px-16 flex justify-center">
                <form 
                   className="max-w-[600px] min-w-[300px] w-full flex flex-col gap-6"
                   onSubmit={handleSubmit}
                >
                    <input 
                      className="inputStyle" type="text" 
                      placeholder="Title"
                      value={title}
                      onChange={(e)=>setTitle(e.target.value)}
                    />
                    <input 
                      className="inputStyle" type="text" 
                      placeholder="Price"
                      value={price}
                      onChange={(e)=>setPrice(Number(e.target.value))}
                    />
                    <textarea 
                      className="inputStyle" 
                      placeholder="description"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                    />
                    <select 
                       className="inputStyle"
                       value={category}
                       onChange={(e)=>setCategory(e.target.value)}
                    >
                       {
                          categories.map((item,index)=>{
                            return(
                                <option key={index}>{item}</option>
                            )
                          })
                       }
                    </select>
                    <input onChange={handleProductImg} className="inputStyle" type="file" />
                    <button className="btnStyle" type="submit">
                        Add Product
                    </button>
                </form>
            </section>
        </div>
    )
}
export default AddProduct;