import { callGetReviews } from "@/apis/api"
import { useAppSelector } from "@/redux/hook";
import { IReview } from "@/types/backend";
import { Avatar, List, Rate, Space, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface IProps {
    productId: string
}

const { Text, Paragraph } = Typography;
const ProductReviews = (props: IProps) => {
    const { productId } = props
    const [currentPage, setCurrentPage] = useState(1);
    const [totalReview, setTotalReview] = useState(1);
    const [reviewScore, setReviewScore] = useState<number | undefined>(0);
    const [dataReviews, setDataReviews] = useState<IReview[]>();

    const auth = useAppSelector(state => state.auth.user);

    useEffect(() => {
        getReviews()
    }, [currentPage, productId]);
    const getReviews = async () => {
        try {
            const res = await callGetReviews(`current=${currentPage}&pageSize=5&product_id=${productId}`);
            if (res.data) {
                setTotalReview(res.data.meta.totalItems);
                setReviewScore(res.data.meta.reviewScore);
                setDataReviews(res.data.result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangePagination = (current: number) => {
        if (current != currentPage) {
            setCurrentPage(current)
        }
    }
    return (
        <>
            <div className="mt-3">

                <List

                    itemLayout="vertical"
                    dataSource={dataReviews}
                    header={<div className="d-flex align-items-center">
                        <Text strong className="fs-5 me-2">{reviewScore}/5</Text>
                        <Rate value={reviewScore} disabled />
                    </div>}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                className="review-title"
                                avatar={
                                    <Avatar
                                        src={item.created_by.avatar ? item.created_by.avatar : "/images/avatar-user1.png"}
                                        size={"large"}
                                    />
                                }
                                title={item.created_by._id === auth._id ? "Me" : item.created_by.name}
                                description={<Rate value={item.star} disabled style={{ fontSize: "16px" }} />}
                            />
                            <Paragraph className="mb-2">{item.comment}</Paragraph>
                            <div className='mb-2'>
                                <Space>
                                    <Text type='secondary'>Đăng lúc:</Text>
                                    <Text>
                                        {dayjs(item.createdAt).format("HH:MM:ss DD/MM/YYYY")}
                                    </Text>
                                </Space>
                            </div>
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
        </>
    )
}

export default ProductReviews