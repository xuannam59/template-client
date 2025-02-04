import { IProducts } from "@/types/backend"
import { compactNumber, VND } from "@/utils/handleCurrency"
import { Rate, Typography } from "antd"
import { Link } from "react-router"

interface IProps {
    item: IProducts
}

const { Paragraph, Title } = Typography
const ProductItem = (props: IProps) => {
    const { item } = props
    const price = item.price * (1 - item.discountPercentage / 100);
    const sales = compactNumber.format(item.sales);
    return (
        <div
            key={item._id}
            className="col-7 col-md-4 col-lg-3 pt-md-3 pb-md-3"
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
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <Rate allowHalf disabled value={item.reviews.score} style={{ fontSize: 16 }} />
                            </div>
                            <div className="col-12 col-md-6 text-md-end">
                                <Paragraph className="m-0">Đã bán {sales}</Paragraph>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductItem