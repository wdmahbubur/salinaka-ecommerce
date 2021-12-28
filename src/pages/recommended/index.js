import MessageDisplay from '../../components/common/MessageDisplay';
import ProductShowcaseGrid from '../../components/product/ProductShowcaseGrid';

import bannerImg from '../../images/banner-girl-1.png';
import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useScrollTop from '../../hooks/useScrollTop';
import useRecommendedProducts from '../../hooks/useRecommendedProducts';

const RecommendedProducts = () => {
  useDocumentTitle('Recommended Products | Salinaka');
  useScrollTop();

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading,
    error
  } = useRecommendedProducts();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Recommended Products</h1>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
        <div className="display">
          <div className="product-display-grid">
            {(error && !isLoading) ? (
              <MessageDisplay
                message={error}
                action={fetchRecommendedProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={recommendedProducts}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecommendedProducts;
