
const initState = {
  lastRefKey: null,
  total: 0,
  items: []
};

const productReducer= (state = {
  lastRefKey: null,
  total: 0,
  items: [],
  searchedProducts: initState
}, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        lastRefKey: action.payload.lastKey,
        total: action.payload.total,
        items: [...state.items, ...action.payload.products]
      };
    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case "SEARCH_PRODUCT_SUCCESS":
      return {
        ...state,
        searchedProducts: {
          lastRefKey: action.payload.lastKey,
          total: action.payload.total,
          items: [...state.searchedProducts.items, ...action.payload.products]
        }
      };
    case "CLEAR_SEARCH_STATE":
      return {
        ...state,
        searchedProducts: initState
      };
    case "REMOVE_PRODUCT_SUCCESS":
      return {
        ...state,
        items: state.items.filter((product) => product.id !== action.payload)
      };
    case "EDIT_PRODUCT_SUCCESS":
      return {
        ...state,
        items: state.items.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              ...action.payload.updates
            };
          }
          return product;
        })
      };
    default:
      return state;
  }
};

export default productReducer;