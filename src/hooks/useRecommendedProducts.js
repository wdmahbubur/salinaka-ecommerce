import axios from 'axios';
import { useEffect, useState } from 'react';

const useRecommendedProducts = (itemsCount) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  const fetchRecommendedProducts = async () => {
    setLoading(true)
    try {
      await axios.get(`http://localhost:5000/api/products?isFeatured=true&&limit=${itemsCount}`).then(res => setRecommendedProducts(res.data))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchRecommendedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    recommendedProducts, loading, error, fetchRecommendedProducts
  };
};

export default useRecommendedProducts;
