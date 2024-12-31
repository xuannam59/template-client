import { useParams } from "react-router"

const ProductDetail = () => {
    const { slug } = useParams();
    return (
        <div>ProductDetail: {slug}</div>
    )
}

export default ProductDetail