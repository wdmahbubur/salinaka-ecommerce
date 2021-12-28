import { displayActionMessage } from '../helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchAddToBasket, removeFromBasket } from '../redux/slices/basketSlice';


const useBasket = () => {
  const { basket } = useSelector((state) => ({ basket: state.basket }));
  const dispatch = useDispatch();

  const isItemOnBasket = (id) => !!basket.find((item) => item._id === id);

  const addToBasket = (product) => {
    if (isItemOnBasket(product._id)) {
      dispatch(removeFromBasket(product._id));
      displayActionMessage('Item removed from basket', 'info');
    } else {
      dispatch(dispatchAddToBasket(product));
      displayActionMessage('Item added to basket', 'success');
    }
  };

  return { basket, isItemOnBasket, addToBasket };
};

export default useBasket;
