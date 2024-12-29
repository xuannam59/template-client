import { useParams } from 'react-router'

const ProductList = () => {
    const { slug } = useParams();
    console.log(slug);
    return (
        <div>ProductList: {slug}</div>
    )
}

export default ProductList