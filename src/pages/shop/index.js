/* eslint-disable react/jsx-props-no-spreading */
import AppliedFilters from '../../components/product/ProductAppliedFilters';
import ProductGrid from '../../components/product/ProductGrid';
import ProductList from '../../components/product/ProductList';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { selectFilter } from '../../selectors/selector';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useScrollTop from '../../hooks/useScrollTop';

const Shop = () => {
  useDocumentTitle('Shop | Salinaka');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredProducts: selectFilter(state.products.products, state.filter),
    products: state.products,
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading
  }), shallowEqual);

  return (
    <main className="content">
      <section className="product-list-wrapper">
        <AppliedFilters filteredProductsCount={store.filteredProducts.length} />
        <ProductList {...store}>
          <ProductGrid products={store.products.products} />
        </ProductList>
      </section>
    </main>
  );
};

export default Shop;
