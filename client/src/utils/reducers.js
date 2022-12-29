
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CART_QUANTITY,



  } from "./actions";
  
  export const reducer = (state, action) => {
    switch (action.type) {

      case UPDATE_PRODUCTS:
        return {
          ...state,
          products: [...action.products],
        };

        case ADD_TO_CART:
          return {
            ...state,
            cartOpen: true, 
            cart: [...state.cart, action.product],
          };

          case ADD_MULTIPLE_TO_CART:
            return {
              ...state,
              cartOpen: true,
              cart: [state.cart, ...action.product],

              };

            case UPDATE_CART_QUANTITY:
              return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                  if (action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity
                  }
                  return product
                })
              };
  
              case UPDATE_CURRENT_CATEGORY:
                return {
                  ...state,
                  currentCategory: action.currentCategory
                };
                
                case UPDATE_CATEGORIES:
                  return {
                    ...state,
                    categories: [...action.categories],
                  };
      default:
        return state;
    }
  };