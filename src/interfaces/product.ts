type Rating = {
    rate:number,
    count:number
 }
 export interface Product{
   id:number,
   title:string,
   price:number,
   category:string,
   description:string,
   image:string,
   rating:Rating
   quantity:number
 }

 export type AddNewProduct ={
    product:Omit<Product,"image"|"id"|"quantity">,
    productImg:any
 }