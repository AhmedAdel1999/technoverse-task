import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import {fetchInstance} from '../utils/constants';
import UploadImg from '../utils/uploadImg';
import {AddNewProduct,Product} from "../interfaces/product"


type InitialState = {
  products: Product[],
  isCreated:boolean,
  isCreatedSuccessfully:boolean,
  isCreateError:boolean,
  loadProducts:boolean
};

const initialState:InitialState = {
  products: [],
  isCreated:false,
  isCreatedSuccessfully:false,
  isCreateError:false,
  loadProducts:false
};


export const createProduct =createAsyncThunk(
  "products/createProduct",
  async({product,productImg}:AddNewProduct,{fulfillWithValue,rejectWithValue})=>{
    try {
      const image = await UploadImg(productImg)
      let response = await fetchInstance.post(`products`,{...product,image})
      return fulfillWithValue(await response.data)
    } catch (error:any) {
      return rejectWithValue(error.message)
    }
  }
)


export const getAllProducts =createAsyncThunk(
  "products/getAllProducts",
  async(undefined,{fulfillWithValue,rejectWithValue})=>{
    try {
      let response = await fetchInstance.get(`products`)
      return fulfillWithValue(await response.data)
    } catch (error:any) {
      return rejectWithValue(error.response)
    }
  }
)


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },

  extraReducers: builder => {

    //create new product
    builder.addCase(createProduct.pending,(state)=>{
        state.isCreated=true;
    });
    builder.addCase(createProduct.fulfilled,(state)=>{
        state.isCreated=false;
        state.isCreatedSuccessfully=true
    });
    builder.addCase(createProduct.rejected,(state)=>{
        state.isCreated=false;
        state.isCreateError=true
    });

    //get all products
    builder.addCase(getAllProducts.pending,(state)=>{
        state.loadProducts=true
    });
    builder.addCase(getAllProducts.fulfilled,(state,action)=>{
        state.loadProducts=false
        state.products=[...action.payload]
    });
},
});

export default productSlice.reducer;
