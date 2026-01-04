import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0,
    cart:localStorage.getItem("cart") ?JSON.parse(localStorage.getItem("cart")):[],
    total:localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")):0

}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state,value){
            state.totalItems = value.payload;
        },
        //ad to cart
        setAddToCart(state,value){
            const course = value.payload
            const index = state.cart.findIndex((item)=>item._id === course._id);

            if(index>=0){
                toast.error("Course Already in cart")
                return
            }

            state.cart.push(course)
            state.totalItems++
            state.total += course.price

            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
               localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
           toast.success("Course added to cart")
        }
        //remaove to cart
    }
})

export const {setTotalItems,setAddToCart} = cartSlice.actions;
export default cartSlice.reducer;