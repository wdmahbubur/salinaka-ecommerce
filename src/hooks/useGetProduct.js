import { useEffect, useState } from "react";
const useGetProduct = () => {
    const [item, setProduct] = useState({});
    console.log("test")
    useEffect(() => {
        console.log("test")
    }, [])
    return { item }
}
export default useGetProduct;