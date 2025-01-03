import { callGetProductDetail } from "@/apis/api";
import { IProducts } from "@/types/backend";
import { Breadcrumb, Rate, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { VND } from "@/utils/handleCurrency";


const { Title, Text } = Typography;

const ProductDetail = () => {
    const { slug } = useParams();
    const [dataDetail, setDataDetail] = useState<IProducts>();
    const [selectedImage, setSelectedImage] = useState<{
        original: string,
        thumbnail: string,
    }[]>([]);
    const price = dataDetail ? dataDetail?.price : 0;
    const newPrice = dataDetail ? dataDetail?.price * (1 - dataDetail?.discountPercentage / 100) : 0
    useEffect(() => {
        fetchProductDetail()
    }, [slug]);

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
            }
        } catch (error) {
            console.log(error);
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
                            <div className="col-12 col-md-5">
                                <ImageGallery
                                    showPlayButton={false}
                                    showFullscreenButton={false}
                                    renderLeftNav={() => <></>}
                                    renderRightNav={() => <></>}
                                    items={selectedImage}
                                />
                            </div>
                            <div className="col">
                                <Title level={3}>{dataDetail?.title}-NEW</Title>
                                <Space>
                                    <Rate disabled defaultValue={5} />
                                    <Text type="secondary">(5.0)</Text>
                                    <Text type="secondary">(1.234)</Text>
                                </Space>
                                <div className="mt-3">
                                    <Space>
                                        <Title level={4}
                                            className="mt-0"
                                        >
                                            {VND.format(newPrice)}
                                        </Title>
                                        <Title level={4}
                                            className="mt-0 text-decoration-line-through"
                                            type="secondary"
                                        >
                                            {VND.format(price)}
                                        </Title>
                                    </Space>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductDetail