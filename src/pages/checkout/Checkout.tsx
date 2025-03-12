import { callCheckDiscountCode, callCreateOrder, callPayOS } from "@/apis/api";
import ListCart from "@/components/checkout/ListCart";
import PaymentMethod from "@/components/checkout/PaymentMethod"
import Reviews from "@/components/checkout/Reviews";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { doOrderProduct } from "@/redux/reducers/cart.reducer";
import { IPayOSPost } from "@/types/backend";
import { VND } from "@/utils/handleCurrency";
import { Button, Card, Divider, Input, message, Modal, notification, Space, Steps, Typography } from "antd";
import { useEffect, useState } from "react";
import { TbArrowLeft, TbArrowRight, TbCreditCard, TbFileDescription, TbMapPin } from "react-icons/tb";

export interface IPaymentDetail {
    shippingAddress: {
        receiver: string;
        phoneNumber: string;
        address: string;
        email: string;
    };
    paymentMethod: string;
}

const { Title, Text } = Typography
const Checkout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [discountValue, setDiscountValue] = useState({ type: "", value: 0, maxValue: 0 });
    const [grandTotal, setGrandTotal] = useState(0);
    const [currentStep, setCurrentStep] = useState<number>(-1);
    const [paymentDetail, setPaymentDetail] = useState<IPaymentDetail>({
        shippingAddress: {
            receiver: "",
            phoneNumber: "",
            address: "",
            email: ""
        },
        paymentMethod: ""
    });
    const user = useAppSelector(state => state.auth.user);
    const productList = useAppSelector(state => state.cart.productList);
    const dispatch = useAppDispatch();
    const totalAmount = productList.reduce((a, b) =>
        a + b.quantity * b.productId.price * (1 - b.productId.discountPercentage / 100)
        , 0) ?? 0;

    useEffect(() => {
        if (discountValue.value && productList.length > 0) {
            switch (discountValue.type) {
                case "percent":
                    setGrandTotal(Math.min(discountValue.maxValue, totalAmount * discountValue.value / 100))
                    break;
                default:
                    setGrandTotal(discountValue.value);
                    break;
            }
        }
    }, [discountValue]);

    const handleCheckDiscountCode = async (code: string, totalAmount: number) => {
        setIsLoading(true);
        try {
            const res = await callCheckDiscountCode(code, totalAmount);
            if (res.data) {
                setDiscountValue({ type: res.data.type, value: res.data.value, maxValue: res.data.maxValue });
                message.success("Thêm mã giảm giá thành công");
            } else {
                notification.error({
                    message: "Error",
                    description: res.message
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const renderComponent = () => {
        switch (currentStep) {
            case 0:
                return <ShippingAddress
                    onSelectAddress={(value) => {
                        if (!value) {
                            notification.error({
                                message: "Lỗi",
                                description: "Không tìm thấy địa chỉ"
                            });
                            return;
                        }
                        const shippingAddress = {
                            receiver: value.name,
                            phoneNumber: value.phoneNumber,
                            address: `${value.homeNo ?
                                value.homeNo + ", " : ""}${value.ward}, ${value.district}, Tỉnh ${value.province}`,
                            email: value.email
                        }
                        setPaymentDetail(prev => ({ ...prev, shippingAddress }))
                        setCurrentStep(1);
                    }}
                />;
            case 1:
                return <PaymentMethod
                    onSelectPaymentMethod={(value) => {
                        if (!value) {
                            notification.error({
                                message: "Lỗi",
                                description: "Không tìm thấy phương thức thanh toán"
                            });
                            return;
                        }
                        setPaymentDetail(prev => ({ ...prev, paymentMethod: value }))
                        setCurrentStep(2);
                    }}
                />;
            case 2:
                return <Reviews
                    setCurrentStep={setCurrentStep}
                    paymentDetail={paymentDetail}
                />;
            default:
                return <ListCart />
        }
    }

    const handleOrder = async () => {
        setIsLoading(true);
        try {
            const products = productList.map(item => ({
                _id: item.productId._id,
                title: item.productId.title,
                quantity: item.quantity,
                color: item.color,
                thumbnail: item.productId.thumbnail,
                price: item.productId.price * (1 - item.productId.discountPercentage / 100),
                cost: item.productId.cost
            }));

            const data = {
                userId: user._id ?? "",
                totalAmount: totalAmount - grandTotal,
                discountCode,
                products,
                ...paymentDetail.shippingAddress,
                paymentMethod: paymentDetail.paymentMethod,
            }
            const res = await callCreateOrder(data);
            if (res.data) {
                dispatch(doOrderProduct());
                if (paymentDetail.paymentMethod === "cod") {
                    Modal.success({
                        title: "Đặt hàng thành công",
                        content: "Cảm ơn bạn đã mua hàng của chúng tôi!",
                        onOk: () => {
                            setCurrentStep(-1);
                            setPaymentDetail({
                                shippingAddress: {
                                    receiver: "",
                                    phoneNumber: "",
                                    address: "",
                                    email: ""
                                },
                                paymentMethod: ""
                            })
                        }
                    });
                } else {
                    const paymentData = {
                        amount: 2000,
                        description: `Thanh toán đơn hàng`,
                        returnUrl: `http://localhost:8080/payment?_id=${res.data._id}`,
                        cancelUrl: "http://localhost:8080/payment",
                        items: productList.map(item => ({
                            name: item.productId.title,
                            quantity: item.quantity,
                            price: item.productId.price * (1 - item.productId.discountPercentage / 100)
                        }))
                    }
                    handlePayMent(paymentData);
                }
            } else {
                notification.error({
                    message: "Đặt hàng thất bại",
                    description: res.message && Array.isArray(res.message) ? res.message.toString() : res.message,
                })
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const handlePayMent = async (data: IPayOSPost) => {
        try {
            const res = await callPayOS(data);
            if (res.data) {
                window.location.href = res.data.checkoutUrl;
            } else {
                notification.error({
                    message: "payment failed",
                    description: res.message
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            {currentStep >= 0 &&
                                <>
                                    <Card className="mb-3">
                                        <Steps
                                            current={currentStep}
                                            labelPlacement="vertical"
                                            items={[
                                                {
                                                    title: "Địa chỉ",
                                                    icon: <Button
                                                        icon={<TbMapPin size={22} />}
                                                        type={currentStep === 0 ? "primary" : "text"}
                                                    />
                                                },
                                                {
                                                    title: "Thanh toán",
                                                    icon: <Button
                                                        icon={<TbCreditCard size={22} />}
                                                        type={currentStep === 1 ? "primary" : "text"}
                                                    />
                                                },
                                                {
                                                    title: "Kiểm tra",
                                                    icon: <Button
                                                        icon={<TbFileDescription size={22} />}
                                                        type={currentStep === 2 ? "primary" : "text"}
                                                    />
                                                }
                                            ]}
                                        />
                                    </Card>
                                </>
                            }
                            <Card>
                                {currentStep >= 0 &&
                                    <Button
                                        type="text"
                                        icon={<TbArrowLeft size={16} />}
                                        onClick={() => setCurrentStep(prev => prev - 1)}
                                    >
                                        Trở lại
                                    </Button>
                                }
                                {renderComponent()}
                            </Card>
                        </div>
                        <div className="col-12 col-lg-3 mt-lg-0 mt-3">
                            <Card
                                title={"Tổng tiền"}
                                extra={<>
                                    <Title level={5} className="mb-0">
                                        {VND.format(totalAmount)}
                                    </Title>
                                </>}>
                                <div className="d-flex flex-column">
                                    <Text type="secondary">
                                        Mã giảm giá
                                    </Text>
                                    <Space.Compact>
                                        <Input
                                            placeholder="Code"
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                            allowClear
                                        />
                                        <Button
                                            type="primary"
                                            onClick={() => handleCheckDiscountCode(discountCode, totalAmount)}
                                            disabled={!discountCode}
                                            loading={isLoading}
                                        >Apply</Button>
                                    </Space.Compact>
                                    <Space className="mt-3" direction="vertical">
                                        <Text>
                                            Mã giảm giá: {discountValue.type === "percent" ?
                                                `${discountValue.value}%`
                                                :
                                                VND.format(discountValue.value)
                                            }
                                        </Text>
                                        <Text>
                                            {grandTotal > 0 &&
                                                `Chiết khấu: - ${VND.format(grandTotal)}`
                                            }
                                        </Text>
                                    </Space>
                                    <Divider style={{ margin: "12px 0" }} />
                                    <Space style={{ width: "100%", justifyContent: "space-between" }}>
                                        <Title level={4}>Thành tiền: </Title>
                                        <Title level={4}>{VND.format(totalAmount - grandTotal)}</Title>
                                    </Space>
                                    {currentStep < 0 &&
                                        <Button
                                            disabled={productList.length === 0}
                                            style={{ width: "100%" }}
                                            type="primary"
                                            onClick={() => setCurrentStep(prev => prev + 1)}
                                            icon={<TbArrowRight size={16} />}
                                            iconPosition="end"
                                        >
                                            Tiếp tục
                                        </Button>
                                    }

                                    {currentStep === 2 &&
                                        <Button
                                            loading={isLoading}
                                            style={{ width: "100%" }}
                                            type="primary"
                                            onClick={handleOrder}
                                            icon={<TbArrowRight size={16} />}
                                            iconPosition="end"
                                        >
                                            {paymentDetail.paymentMethod === "cod" ?
                                                "Đặt hàng"
                                                :
                                                "Thanh toán"}
                                        </Button>
                                    }
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout