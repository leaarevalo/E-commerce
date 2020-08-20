import { FETCH_PRODUCTS_SUCCESS } from "../actions/productsAction";

const initialState = {
  products: [],
  product: {},
};

function products(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };

    // case DELETE_PRODUCTS: {
    //   return {
    //     ...state,
    //     products: state.products.filter((product) => {
    //       return product.id !== action.payload.id;
    //     }),
    //   };
    //}
    default:
      return state;
  }
}

export default products;
