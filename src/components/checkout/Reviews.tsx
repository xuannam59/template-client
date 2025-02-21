import { useAppSelector } from "@/redux/hook";
import { VND } from "@/utils/handleCurrency";
import { Avatar, Button, List, Tag, Typography } from "antd"
import dayjs from "dayjs"
import Section from "../home/Section";
import { TbCreditCardPay, TbEdit, TbMapPin, TbPhoneCall, TbUser } from "react-icons/tb";
import { methods } from "./PaymentMethod";
import { IPaymentDetail } from "@/pages/checkout/Checkout";
interface IProps {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    paymentDetail: IPaymentDetail
}
const { Title, Paragraph, Text } = Typography
const Reviews = (props: IProps) => {
    const { paymentDetail, setCurrentStep } = props;
    const productList = useAppSelector(state => state.cart.productList);
    const estimatedDelivery = dayjs().add(3, "day").format("DD/MM/YYYY");
    return (
        <>
            <Section>
                <Title level={4} className="">Thông tin đơn hàng</Title>
                <Paragraph type="secondary">
                    Thời gian dự kiến giao hàng: {estimatedDelivery}
                </Paragraph>
                <List
                    dataSource={productList}
                    renderItem={item => {
                        const newPrice = item.productId.price * (1 - item.productId.discountPercentage / 100);
                        return (
                            <List.Item key={item._id}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar style={{ height: "auto" }} src={item.productId.thumbnail} size={80} />
                                    }
                                    title={<>
                                        <Paragraph
                                            className="m-0 fs-6"
                                            ellipsis={{ rows: 1, tooltip: item.productId.title }}
                                        >
                                            {item.productId.title}
                                        </Paragraph>
                                    </>
                                    }
                                    description={
                                        <>
                                            <Paragraph className="m-0" type="secondary">
                                                {VND.format(newPrice)} x {item.quantity}
                                            </Paragraph>
                                            <div className="d-flex align-items-center">
                                                <Text type="secondary" className="me-2">
                                                    Màu sắc:
                                                </Text>
                                                <Tag
                                                    color={item.color}
                                                    style={{ width: 18, height: 18, border: "1px solid #2121211a" }}
                                                />
                                            </div>
                                        </>
                                    }
                                />
                            </List.Item>
                        )
                    }} />
            </Section>
            <Section>
                <Title level={4} className="">Địa chỉ giao hàng</Title>
                <List
                    dataSource={[paymentDetail]}
                    renderItem={item => {
                        return (
                            <List.Item
                                extra={
                                    <Button
                                        onClick={() => setCurrentStep(0)}
                                        icon={<TbEdit size={18} />}
                                        type="text"
                                        className="text-muted"
                                    />
                                }
                            >
                                <List.Item.Meta
                                    title={
                                        <>
                                            <div className="d-flex align-items-center">
                                                <TbUser size={18} />
                                                <Text className="ms-2"> {item.shippingAddress.receiver} </Text>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <TbPhoneCall size={18} />
                                                <Text className="ms-2">{item.shippingAddress.phoneNumber}</Text>
                                            </div>
                                        </>
                                    }
                                    description={<>
                                        <div className="d-flex align-items-center">
                                            <TbMapPin size={18} />
                                            <Text className="ms-2" type="secondary">
                                                {item.shippingAddress.address}
                                            </Text>
                                        </div>
                                    </>}
                                />
                            </List.Item>
                        )
                    }} />
            </Section>
            <Section>
                <Title level={4} className="">Phương thức thanh toán</Title>
                <TbCreditCardPay size={18} />
                <Text type="secondary" className="ms-2">
                    {methods.find(item => item.key === paymentDetail.paymentMethod)?.title}
                </Text>
            </Section>
        </>
    )
}

export default Reviews