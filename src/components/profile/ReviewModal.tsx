import { callCreateReview, callUploadSingleFile } from '@/apis/api';
import { IOrder } from '@/types/backend'
import { handleChangeUpload } from '@/utils/functionChangeAntd';
import { Avatar, Form, Input, message, Modal, notification, Rate, Space, Typography, Upload } from 'antd'
import { useState } from 'react';
import { TbUpload } from 'react-icons/tb';

interface IProp {
    orderId: string;
    product: IOrder["products"][number] | undefined;
    isVisible: boolean;
    onClose: () => void;
    getOrders: () => Promise<void>;
}

const { Title } = Typography;

const ReviewModal = (props: IProp) => {
    const { product, isVisible, onClose, orderId, getOrders } = props
    const [isLoading, setIsLoading] = useState(false);
    const [imageList, setImageList] = useState<any[]>([]);
    const [form] = Form.useForm();

    const handleSubmit = async (values: { rating: number; comment: string }) => {
        setIsLoading(true);
        let data: any = {
            comment: values.comment,
            product_id: product?._id,
            parent_id: "",
            star: values.rating,
            images: []
        }
        if (imageList.length > 0) {
            const urls: string[] = [];
            for (let image of imageList) {
                if (image.originFileObj) {
                    const url = await callUploadSingleFile(image.originFileObj, "images/reviews");
                    if (url.data) {
                        urls.push(url.data.fileUpload)
                    } else {
                        notification.error({
                            message: image.name,
                            description: url.message && Array.isArray(url.message) ?
                                url.message.toString() :
                                url.message,
                            duration: 3
                        })
                    }
                } else {
                    urls.push(image.url);
                }
                data.images = urls;
            }
        }
        const res = await callCreateReview(orderId, data);
        if (res.data) {
            onCancel();
            getOrders();
            message.success("Đánh giá sản phẩm thành công!");
        } else {
            notification.error({
                message: "Đánh giá thất bại",
                description: res.message && Array.isArray(res.message) ?
                    res.message.toString() :
                    res.message,
                duration: 3
            })
        }
        setIsLoading(false)
    }

    const onCancel = () => {
        onClose();
        form.resetFields();
    }
    return (
        <Modal title="Đánh giá sản sản phẩm"
            open={isVisible}
            onOk={() => form.submit()}
            onCancel={onCancel}
            centered
            confirmLoading={isLoading}
            okText={"Đánh giá"}
        >
            {product && (
                <>
                    <Space align="center" direction="vertical">
                        <Title level={4} className='m-0' ellipsis={{ rows: 2, tooltip: product.title }}>
                            {product.title}
                        </Title>
                        <Avatar src={product.thumbnail} shape="square" size={100} />
                    </Space>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        disabled={isLoading}
                    >
                        <Form.Item
                            label="Đánh giá"
                            name="rating"
                            rules={[{ required: true, message: "Vui lòng chọn số sao!" }]}
                            style={{ textAlign: "center" }}
                        >
                            <Rate allowHalf style={{ fontSize: 32 }} />
                        </Form.Item>
                        <Form.Item
                            label="Nhận xét"
                            name="comment"
                            rules={[{ required: true, message: "Vui lòng nhập nhận xét!" }]}
                        >
                            <Input.TextArea rows={2} placeholder="Nhập đánh giá của bạn..." />
                        </Form.Item>
                        <Form.Item label={<Title level={4}>Hình ảnh</Title>}>
                            <Upload
                                multiple
                                fileList={imageList}
                                accept='image/*'
                                listType='picture-card'
                                onChange={handleChangeUpload(setImageList)}
                            >
                                {imageList.length < 3 && <TbUpload size={20} />}
                            </Upload>
                        </Form.Item>
                    </Form>
                </>
            )}
        </Modal>
    )
}

export default ReviewModal