import useDidMount from '../hooks/useDidMount';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useProduct = (id) => {

  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!product || product.id !== id) {
          setLoading(true);
          const doc = await axios.get(`http://localhost:5000/api/products/${id}`)

          if (doc.exists) {
            const data = doc.data;
            if (didMount) {
              setProduct(data);
              setLoading(false);
            }
          } else {
            setError('Product not found.');
          }
        }
      } catch (err) {
        if (didMount) {
          setLoading(false);
          setError(err?.message || 'Something went wrong.');
        }
      }
    })();
  }, [id]);

  return { product, isLoading, error };
};

export default useProduct;
