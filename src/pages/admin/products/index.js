/* eslint-disable react/jsx-props-no-spreading */
import Boundary from '../../../components/common/Boundary';
import AppliedFilters from '../../../components/product/ProductAppliedFilters';
import ProductList from '../../../components/product/ProductList';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../../selectors/selector';
import { ProductsNavbar } from '../components';
import ProductsTable from '../components/ProductsTable';
import { withRouter } from 'react-router-dom';

const Products = () => {
  useDocumentTitle('Product List | Salinaka Admin');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredProducts: selectFilter(state.products.products, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    products: state.products
  }));

  return (
    <Boundary>
      <ProductsNavbar
        productsCount={store.products.products.length}
        totalProductsCount={store.products.products.length}
      />
      <div className="product-admin-items">
        <ProductList {...store}>
          <AppliedFilters filter={store.filter} />
          <ProductsTable filteredProducts={store.filteredProducts} />
        </ProductList>
      </div>
    </Boundary>
  );
};

export default withRouter(Products);
