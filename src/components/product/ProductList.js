/* eslint-disable react/forbid-prop-types */
import Boundary from '../common/Boundary';
import MessageDisplay from '../common/MessageDisplay';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../redux/slices/productSlice';
import { loading } from '../../redux/slices/appSlice';

const ProductList = (props) => {
  const {
    products, filteredProducts, isLoading, requestStatus, children
  } = props;
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const fetchProducts = () => {
    setFetching(true);
    dispatch(getProduct());
  };
  useEffect(() => {
    if (products.products.length === 0) {
      fetchProducts();
    }

    window.scrollTo(0, 0);
    return () => dispatch(loading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, []);

  if (products.products.length === 0 && !isLoading) {
    return (
      <MessageDisplay message={requestStatus?.message || 'No products found.'} />
    );
  }
  if (products.products.length === 0 && requestStatus) {
    return (
      <MessageDisplay
        message={requestStatus?.message || 'Something went wrong :('}
        action={fetchProducts}
        buttonLabel="Try Again"
      />
    );
  }
  return (
    <Boundary>
      {children}
      {/* Show 'Show More' button if products length is less than total products */}
      {products.products.length < products.total && (
        <div className="d-flex-center padding-l">
          <button
            className="button button-small"
            disabled={isFetching}
            onClick={fetchProducts}
            type="button"
          >
            {isFetching ? 'Fetching Items...' : 'Show More Items'}
          </button>
        </div>
      )}
    </Boundary>
  );
};

ProductList.defaultProps = {
  requestStatus: null
};

ProductList.propTypes = {
  products: PropType.object.isRequired,
  filteredProducts: PropType.array.isRequired,
  isLoading: PropType.bool.isRequired,
  requestStatus: PropType.string,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default ProductList;
