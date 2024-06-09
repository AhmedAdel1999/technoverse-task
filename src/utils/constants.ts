import axios from "axios";
const categories:string[] = ["men's clothing","jewelery","electronics","women's clothing"];
const fetchInstance = axios.create({
    baseURL: "https://fakestoreapi.com/"
})
export {categories,fetchInstance}