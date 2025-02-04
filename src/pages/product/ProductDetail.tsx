import { callAddProductToCart, callGetProductDetail, callGetRelatedProduct } from "@/apis/api";
import { IProducts } from "@/types/backend";
import { Breadcrumb, Button, InputNumber, message, notification, Rate, Space, Tabs, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router"
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { VND } from "@/utils/handleCurrency";
import { TbCheck, TbMinus, TbPlus } from "react-icons/tb";
import { useAppDispatch } from "@/redux/hook";
import { doGetCart } from "@/redux/reducers/cart.reducer";
import Tabbar from "@/components/home/Tabbar";
import ProductItem from "@/components/product/ProductItem";
import ProductReviews from "@/components/product/ProductReviews";
import ProductDiscuss from "@/components/product/ProductDiscuss";


const { Title, Text, Paragraph } = Typography;

const ProductDetail = () => {
    const { slug } = useParams();
    const [dataDetail, setDataDetail] = useState<IProducts>();
    const [relatedProducts, setRelatedProducts] = useState<IProducts[]>();
    const [selectColor, setSelectColor] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<{
        original: string,
        thumbnail: string,
    }[]>([]);
    const [count, setCount] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const tabsRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProductDetail()
        getRelatedProducts()
    }, [slug]);

    const quantity = dataDetail ? dataDetail.versions.find(item => item.color === selectColor)?.quantity : 0;
    const price = dataDetail ? dataDetail.price : 0;
    const newPrice = dataDetail ? dataDetail.price * (1 - dataDetail?.discountPercentage / 100) : 0;
    const fetchProductDetail = async () => {
        try {
            const res = await callGetProductDetail(slug);
            if (res.data) {
                setDataDetail(res.data);
                const images = res.data.images.map(item => {
                    return {
                        original: item,
                        thumbnail: item,
                    }
                })
                setSelectedImage(images);
                setSelectColor(res.data.versions[0].color);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getRelatedProducts = async () => {
        try {
            const res = await callGetRelatedProduct(slug);
            if (res.data) {
                setRelatedProducts(res.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddItem = async () => {
        setIsLoading(true)
        try {
            const id = dataDetail ? dataDetail?._id : ""
            const res = await callAddProductToCart(id, count, selectColor);
            if (res.data) {
                dispatch(doGetCart(res.data));
                message.success("Thêm vào giỏ hàng thành công")
            } else {
                res.statusCode === 400 ?
                    notification.warning({
                        message: "Warning",
                        description: res.message,
                        duration: 3
                    }) :
                    notification.error({
                        message: "Error",
                        description: res.message && Array.isArray(res.message) ? res.message.toString() : res.message,
                        duration: 3
                    })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }
    return (
        <>
            {!dataDetail ?
                <span>Loading</span>
                :
                <div className="container-fluid bg-white pt-1 pb-2">
                    <div className="container mb-5 mt-3">
                        <Breadcrumb items={[
                            {
                                key: "home",
                                title: <Link to={"/"}>Home</Link>
                            },
                            {
                                key: "category",
                                title: <Link to={`/products/list/${dataDetail.categoryId._id}`}>
                                    {dataDetail.categoryId.title}
                                </Link>
                            },
                            {
                                key: dataDetail?._id,
                                title: dataDetail?.title
                            }
                        ]} />

                        <div className="row mt-3">
                            <div className="col-12 col-md-6">
                                <ImageGallery
                                    showPlayButton={false}
                                    showFullscreenButton={false}
                                    renderLeftNav={() => <></>}
                                    renderRightNav={() => <></>}
                                    items={selectedImage}
                                />
                                <div className="mt-3 mb-3 text-center">
                                    JunKun là đại lý ủy quyền chính thức của Apple tại Việt Nam
                                </div>
                                <div className="text-center py-2 px-2 px-md-0"
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "16px",
                                    }}
                                >
                                    Sản phẩm chính hãng Apple mới 100% nguyên seal.
                                    Phụ kiện chính hãng gồm: hộp trùng imei, sạc, cable, sách hướng dẫn
                                </div>
                            </div>
                            <div className="col">
                                <Title level={3}>{dataDetail?.title}-NEW</Title>
                                <Space>
                                    <Rate disabled value={dataDetail.reviews.score} />
                                    <Text type="secondary">({dataDetail.reviews.score})</Text>
                                    <Text type="secondary">({dataDetail.reviews.numberOf})</Text>
                                </Space>
                                <div className="mt-3">
                                    <Space>
                                        <Title level={4}
                                            className="mb-0 text-danger"

                                        >
                                            {VND.format(newPrice)}
                                        </Title>
                                        <Title level={4}
                                            className="mb-0 text-decoration-line-through"
                                            type="secondary"
                                        >
                                            {VND.format(price)}
                                        </Title>
                                    </Space>
                                </div>
                                <div className="mt-3">
                                    <Paragraph>
                                        <TbCheck size={20}
                                            style={{
                                                marginRight: "8px",
                                                color: "#6252CD"
                                            }}
                                        />
                                        Sản phẩm chính hãng Apple mới 100% nguyên seal
                                    </Paragraph>
                                    <Paragraph>
                                        <TbCheck size={20}
                                            style={{
                                                marginRight: "8px",
                                                color: "#6252CD"
                                            }}
                                        />
                                        Giá đã bao gồm VAT
                                    </Paragraph>
                                    <Paragraph>
                                        <TbCheck size={20}
                                            style={{
                                                marginRight: "8px",
                                                color: "#6252CD"
                                            }}
                                        />
                                        Bảo hành 12 tháng
                                    </Paragraph>
                                    <Paragraph>
                                        <TbCheck size={20}
                                            style={{
                                                marginRight: "8px",
                                                color: "#6252CD"
                                            }}
                                        />
                                        Giảm giá 10% khi mua phụ kiện kèm theo
                                    </Paragraph>
                                </div>
                                <div className="mt-3">
                                    <Space>
                                        <Text className="fw-bold fs-5">
                                            Màu sắc :
                                        </Text>
                                        {dataDetail.versions.map(item =>
                                            <a key={item.color}>
                                                <div
                                                    className={`color-item ${selectColor === item.color ? "active" : ""}`}
                                                    style={{ background: item.color }}
                                                    onClick={() => setSelectColor(item.color)}
                                                />
                                            </a>
                                        )}
                                    </Space>
                                </div>
                                <div className="mt-3">
                                    <Paragraph>Số lượng còn: {quantity}</Paragraph>
                                    <Space
                                        size={"middle"}
                                        align="center" >
                                        <div className="button-grounds">
                                            <Button
                                                disabled={count <= 1}
                                                onClick={() => setCount(count - 1)}
                                                type="text"
                                                icon={<TbMinus size={20} />}
                                            />
                                            <InputNumber
                                                variant="borderless"
                                                style={{ width: "50px" }}
                                                controls={false}
                                                min={0}
                                                max={quantity}
                                                value={count}
                                                onChange={(value) => setCount(value ?? count)}
                                            />
                                            <Button
                                                disabled={count === quantity}
                                                onClick={() => setCount(count + 1)}
                                                type="text"
                                                icon={<TbPlus size={20} />}
                                            />
                                        </div>
                                    </Space>
                                </div>
                                <div className="mt-3">
                                    <Button
                                        className="text-center btn-add-cart"
                                        onClick={() => handleAddItem()}
                                        disabled={quantity && quantity <= 0 ? true : false}
                                        type="primary"
                                        loading={isLoading}
                                    >
                                        <div className="d-flex flex-column">
                                            <span className="fs-5 fw-bold">
                                                THÊM VÀO GIỎ
                                            </span>
                                            <span className="d-none d-md-block fs-6">
                                                chọn thêm món đồ khác
                                            </span>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="my-3" ref={tabsRef}>
                            <Tabs
                                items={[
                                    {
                                        key: "descriptions",
                                        label: "Mô tả",
                                        children: <>
                                            <div dangerouslySetInnerHTML={{ __html: dataDetail.description }} />
                                        </>
                                    },
                                    {
                                        key: "additionalInformation",
                                        label: "Bổ sung thêm",
                                        children: <>
                                            <p>
                                                Bổ sung thêm.....
                                            </p>
                                        </>
                                    },
                                    {
                                        key: "reviews",
                                        label: `Đánh giá (${dataDetail.reviews.numberOf})`,
                                        children: <ProductReviews productId={dataDetail._id} tabsRef={tabsRef} />
                                    },
                                    {
                                        key: "discusses",
                                        label: "Thảo luận",
                                        children: <ProductDiscuss productId={dataDetail._id} />
                                    }
                                ]}
                            />
                        </div>
                        {relatedProducts && relatedProducts.length > 0 &&
                            <div className="mt-3">
                                <Tabbar
                                    title="Sản phẩm liên quan"
                                    textAlign="start"
                                />
                                <div className="row justify-content-center">
                                    {relatedProducts.map(item => <ProductItem key={item._id} item={item} />)}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default ProductDetail