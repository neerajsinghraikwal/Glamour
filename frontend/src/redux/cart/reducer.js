
import { DELETE_CART_ITEM, GET_CART_DETAILS, UPDATE_CART_QUANTITY } from "./actionType";


const initState = {
    cartData : []
};

export const cartReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GET_CART_DETAILS:
            return{
                ...state,
                cartData:payload
            }
        case UPDATE_CART_QUANTITY: 
            return {
                ...state,
                cartData: state.cartData.map((item) => {
                    if (item._id === payload.id) {
                        item.quantity = payload.value;
                    }
                    return item;
                }),
            }
        case DELETE_CART_ITEM :
            return{
                ...state,
                cartData: state.cartData.filter((item) => item._id !== payload.id),
            }
        default:
            return state;
    }
};