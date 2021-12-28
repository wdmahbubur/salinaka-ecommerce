
import { useEffect, useState } from 'react';

import axios from 'axios';

const useFeaturedProducts = (itemsCount) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  const fetchFeaturedProducts = async () => {
    setLoading(true)
    try {
      await axios.get(`http://localhost:5000/api/products?isFeatured=true&&limit=${itemsCount}`).then(res => setFeaturedProducts(res.data))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchFeaturedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    featuredProducts, loading, error, fetchFeaturedProducts
  };
};

export default useFeaturedProducts;
