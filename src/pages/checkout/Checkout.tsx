import { callCheckDiscountCode } from "@/apis/api";
import ListCart from "@/components/checkout/ListCart";
import { useAppSelector } from "@/redux/hook";
import { VND } from "@/utils/handleCurrency";
import { Button, Card, Divider, Input, message, notification, Space, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title, Text } = Typography
const Checkout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [discountValue, setDiscountValue] = useState<{
        type: string,
        value: number,
        maxValue: number
    }>({ type: "", value: 0, maxValue: 0 });
    const productList = useAppSelector(state => state.cart.productList);
    const [grandTotal, setGrandTotal] = useState(0);
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
    return (
        <>
            <div className="container-fluid">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <Title style={{ fontWeight: 400 }} level={2} >Thanh toán</Title>
                            <ListCart />
                        </div>
                        <div className="col-12 col-lg-3 mt-lg-5 mt-3">
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
                                    <Button style={{ width: "100%" }} type="primary">Tiếp tục</Button>
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