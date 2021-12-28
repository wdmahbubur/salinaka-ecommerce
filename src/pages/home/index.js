import { ArrowRightOutlined } from '@ant-design/icons';
import MessageDisplay from '../../components/common/MessageDisplay';
import ProductShowcaseGrid from '../../components/product/ProductShowcaseGrid';
// import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from 'constants/routes';

import bannerImg from '../../images/banner-girl.png';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useScrollTop from '../../hooks/useScrollTop';
import useFeaturedProducts from '../../hooks/useFeaturedProducts';
import useRecommendedProducts from '../../hooks/useRecommendedProducts';

const Home = () => {
  useDocumentTitle('Salinaka | Home');
  useScrollTop();

  const {
    featuredProducts,
    loading: isLoadingFeatured,
    error: errorFeatured,
    fetchFeaturedProducts
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    loading: isLoadingRecommended,
    error: errorRecommended
  } = useRecommendedProducts(6);



  return (
    <main className="content">
      <div className="home">
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>See</strong>
              &nbsp;everything with&nbsp;
              <strong>Clarity</strong>
            </h1>
            <p>
              Buying eyewear should leave you happy and good-looking, with money in your pocket.
              Glasses, sunglasses, and contacts—we’ve got your eyes covered.
            </p>
            <br />
            <Link to="/shop" className="button">
              Shop Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img"><img src={bannerImg} alt="" /></div>
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Featured Products</h1>
            <Link to="/features-products">See All</Link>
          </div>
          {(errorFeatured && !isLoadingFeatured) ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Recommended Products</h1>
            <Link to="/recommended-products">See All</Link>
          </div>
          {(errorRecommended && !isLoadingRecommended) ? (
            <MessageDisplay
              message={errorRecommended}
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
    </main>
  );
};

export default Home;
