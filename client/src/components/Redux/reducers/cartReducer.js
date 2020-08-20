import {
  ADD_TO_CART,
  CLEAR_PRODUCT,
  INCREASE_QUANTITY,
  CLEAR_CART,
} from "../actions/cartAction";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;
      const cartItems = [...state];
      let productAlreadyInCart = false;
      cartItems.forEach((cp) => {
        if (
          cp.id === product.id &&
          cp.selectedColor === product.selectedColor
        ) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });
      if (!productAlreadyInCart) {
        var newProduct = { ...product, count: 1 };
        cartItems.push(newProduct);
      }
      localStorage.setItem("products", JSON.stringify(cartItems));
      alert("Se agrego un producto a su carrito");
      return cartItems;

    case CLEAR_PRODUCT:
      return [
        ...state.filter(
          (item) =>
            item.selectedColor !== action.payload.selectedColor ||
            item.id !== action.payload.id
        ),
      ];

    case CLEAR_CART:
      let itemsCart = [...state];
      itemsCart = initialState;
      return itemsCart;

    case INCREASE_QUANTITY:
      // const productSelected = action.payload;
      const itemSelected = state.find(
        (item) => item.id === action.payload.product.id
      );
      itemSelected.count = action.payload.cant;
      return [...state];

    default:
      return state;
  }
}
