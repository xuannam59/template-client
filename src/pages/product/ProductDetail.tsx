import { useParams } from "react-router"

const ProductDetail = () => {
    const params = useParams();
    console.log(params);
    return (
        <div>ProductDetail: { }</div>
    )
}

export default ProductDetail