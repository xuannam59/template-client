import { callChangeLike, callGetReviews } from "@/apis/api"
import { useAppSelector } from "@/redux/hook";
import { IReview } from "@/types/backend";
import { Avatar, Image, List, Modal, Rate, Space, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TbClock, TbThumbUp, TbThumbUpFilled } from "react-icons/tb";
import { useNavigate } from "react-router";

interface IProps {
    productId: string
}

const { Title, Text, Paragraph } = Typography;
const ProductReviews = (props: IProps) => {
    const { productId } = props
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalReview, setTotalReview] = useState(1);
    const [reviewScore, setReviewScore] = useState<number | undefined>(0);
    const [dataReviews, setDataReviews] = useState<IReview[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);


    useEffect(() => {
        getReviews()
    }, [currentPage, productId]);

    const getReviews = async () => {
        setIsLoading(true);
        try {
            const res = await callGetReviews(`current=${currentPage}&pageSize=5&product_id=${productId}`);
            if (res.data) {
                setTotalReview(res.data.meta.totalItems);
                setReviewScore(res.data.meta.reviewScore);
                setDataReviews(res.data.result);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleChangePagination = (current: number) => {
        if (current != currentPage) {
            setCurrentPage(current)
        }
    }

    const handleLike = async (reviewId: string) => {
        if (!isAuthenticated) {
            setIsModalOpen(true);
            return;
        }
        try {
            const res = await callChangeLike(reviewId);
            if (res.data)
                getReviews();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="mx-3 container">
                <List
                    loading={isLoading}
                    itemLayout="vertical"
                    dataSource={dataReviews}
                    header={<div className="d-flex align-items-center">
                        <Text strong className="fs-5 me-2">{reviewScore}/5</Text>
                        <Rate value={reviewScore} disabled allowHalf />
                    </div>}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                className="review-title"
                                avatar={
                                    <Avatar
                                        size={40}
                                        src={item.created_by.avatar ? item.created_by.avatar : "/images/avatar-user1.png"}

                                    />
                                }
                                title={<div className="d-flex align-items-center">
                                    <Text style={{ fontSize: "16px" }}>
                                        {item.created_by._id === user._id ? "Me" : item.created_by.name}
                                    </Text>
                                    <Text type="secondary" style={{ fontSize: "12px" }}>
                                        <TbClock className="mx-1" />

                                    </Text><Text type="secondary" style={{ fontSize: "12px" }}>
                                        {dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}
                                    </Text>
                                </div>}
                                description={
                                    <>
                                        <Rate allowHalf value={item.star} disabled style={{ fontSize: "16px" }} />
                                        <Paragraph className="mb-0">{item.comment}</Paragraph>
                                        {item.images.length > 0 &&
                                            <Space className="mt-2">
                                                {item.images.map(item =>
                                                    <Image
                                                        key={item}
                                                        src={item}
                                                        width={100}
                                                    />
                                                )}
                                            </Space>
                                        }
                                        <div className="d-flex align-items-center mt-2">

                                            {!item.like.includes(user._id) ?
                                                <TbThumbUp
                                                    size={20}
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleLike(item._id)}
                                                />
                                                :
                                                <TbThumbUpFilled
                                                    size={20}
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleLike(item._id)}
                                                />
                                            }

                                            <Text type="secondary">
                                                {item.like.length === 0 ?
                                                    "Hữu ích?"
                                                    :
                                                    `${item.like.length}`
                                                }
                                            </Text>
                                        </div>
                                    </>
                                }
                            />
                        </List.Item>
                    )}

                    pagination={{
                        onChange: handleChangePagination,
                        current: currentPage,
                        total: totalReview,
                        pageSize: 5,
                        align: "center"
                    }}
                />
            </div>
            <Modal
                width={350}
                open={isModalOpen}
                onOk={() => navigate("/login")}
                onCancel={() => setIsModalOpen(false)}
                okText={"Login"}
            >
                <Title level={4} className="text-center">Jmember</Title>
                <Paragraph className="text-center fw-bold fs-6 text-muted">
                    Vui lòng đăng nhập tài khoản Jmember để like.
                </Paragraph>
            </Modal>
        </>
    )
}

export default ProductReviews