import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const addProduct = createAsyncThunk(
    'products/addProducts',
    async (product) => {
        if (product.image.name) {
            let body = new FormData();
            body.set('key', process.env.REACT_APP_IMGBB_API_KEY);
            body.append('image', product.image);
            body.append('name', product.name);

            await axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload',
                data: body
            }).then(res => {
                product.image = res.data.data.display_url;
            }).catch((e) => {
                console.log(e);
            });
        }
        const response = await axios.post('http://localhost:5000/api/products', { product: product })
        console.log(response.data)
        return response.data;
    }
)
export const getProduct = createAsyncThunk(
    'products/getProducts',
    async () => {
        const response = await axios.get('http://localhost:5000/api/products');
        return response.data;
    }
)

export const getFeaturedProduct = createAsyncThunk(
    'products/getFeaturedProducts',
    async (itemsCount) => {
        const response = await axios.get(`http://localhost:5000/api/products?isFeatured=true&&limit=${itemsCount}`);
        return response.data;
    }
)

export const getRecommendedProduct = createAsyncThunk(
    'products/getRecommendedProducts',
    async (itemsCount) => {
        const response = await axios.get(`http://localhost:5000/api/products?isRecommended=true&&limit=${itemsCount}`);
        return response.data;
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        featuredProducts: [],
        recommendedProducts: [],
        loading: false
    },
    reducers: {
        viewProduct: (state, action) => {
            state.add_product = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addProduct.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(getProduct.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        })
        builder.addCase(getFeaturedProduct.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getFeaturedProduct.fulfilled, (state, action) => {
            state.featuredProducts = action.payload;
            state.loading = false;
        })
        builder.addCase(getRecommendedProduct.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getRecommendedProduct.fulfilled, (state, action) => {
            state.recommendedProducts = action.payload;
            state.loading = false;
        })
    }

})

// Action creators are generated for each case reducer function
export const { viewProduct } = productSlice.actions

export default productSlice.reducer