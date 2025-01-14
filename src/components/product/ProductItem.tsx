import { IProducts } from "@/types/backend"
import { VND } from "@/utils/handleCurrency"
import { Rate, Typography } from "antd"
import { Link } from "react-router"

interface IProps {
    item: IProducts
}

const { Paragraph, Title } = Typography
const ProductItem = (props: IProps) => {
    const { item } = props
    const price = item.price * (1 - item.discountPercentage / 100);
    const sales = new Intl.NumberFormat('en', { notation: 'compact' }).format(item.sales);
    return (
        <div
            key={item._id}
            className="col-6 col-md-4 col-lg-3 pt-3 pb-3"
        >
            <div className="product-item">
                <div>
                    <div className="product-image">
                        <Link to={`/products/detail/${item.slug}`} >
                            <img
                                className="product-image-content"
                                src={item.images[0]}
                                alt={item.title}
                            />
                        </Link>
                    </div>
                    <div className="text-center mb-3">
                        <Link to={`/products/detail/${item.slug}`}>
                            <Title level={5} className="m-0">
                                {item.title}
                            </Title>
                        </Link>
                        <Paragraph className="m-0 fs-5 text-danger fw-bold">
                            {VND.format(price)}
                        </Paragraph>
                    </div>
                </div>
                <div className="row g-2 flex-column">
                    <div className="col">
                        <div className="d-flex justify-content-between align-items-center">
                            <Rate disabled defaultValue={2} style={{ fontSize: 16 }} />
                            <Paragraph className="m-0">Đã bán {sales}</Paragraph>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductItem