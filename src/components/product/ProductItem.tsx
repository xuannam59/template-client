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
    const sold = compactNumber.format(item.sold);
    return (
        <div
            key={item._id}
            className={`col-12 col-md-6 col-lg-3 py-3 py-lg-0 my-2`}
        >
            <div className="product-item">
                <div>
                    <div className="product-image">
                        <Link to={`/products/detail/${item.slug}`} className="d-block text-center">
                            <img
                                className="product-image-content"
                                src={item.thumbnail}
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
                            <div className="col-12 col-md-6 col-lg-8">
                                <Rate allowHalf disabled value={item.reviews.score} style={{ fontSize: 16 }} />
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 text-md-end">
                                <Paragraph className="m-0">Đã bán {sold}</Paragraph>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductItem