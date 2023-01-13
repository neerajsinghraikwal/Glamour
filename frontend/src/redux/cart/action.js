import { DELETE_CART_ITEM, GET_CART_DETAILS, UPDATE_CART_QUANTITY } from "./actionType";
import axios from 'axios'

export const getCartDetails = (id,token) => async(dispatch)=> {
    let res = await axios.get(`https://glamour.onrender.com/cart/${id}`,{headers:{authorization:token}})
    console.log("res",res.data)
    return dispatch({type: GET_CART_DETAILS, payload: res.data})
}


export const updateQuantity = (id,value) => async(dispatch)=> {
    let res = await axios.patch(`https://glamour.onrender.com/cart/${id}`,{quantity:value})
    return dispatch({type: UPDATE_CART_QUANTITY,payload:{id,value}})
}


export const deleteCartItem = (id) => async(dispatch)=> {
    let res = await axios.delete(`https://glamour.onrender.com/cart/${id}`)
    return dispatch({type: DELETE_CART_ITEM,payload:{id}})
}
