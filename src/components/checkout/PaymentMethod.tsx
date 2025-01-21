import { Button, Card, List, Modal, Radio, Typography } from "antd";
import { useState } from "react";
import CreditCardPayment from "./CreditCardPayment";

interface IProps {
    onSelectPaymentMethod: (value: any) => void
}

const methods = [
    {
        key: "cod",
        title: "Thanh toán khi nhận hàng"
    },
    {
        key: "debit",
        title: "Thẻ tín dụng/Ghi lợ"
    },
    {
        key: "google",
        title: "Google pay"
    },
    {
        key: "paypal",
        title: "Paypal"
    },
]

const { Title } = Typography
const PaymentMethod = (props: IProps) => {
    const { onSelectPaymentMethod } = props;
    const [methodSelected, setMethodSelected] = useState("cod");
    const [isVisibleModelPayment, setIsVisibleModelPayment] = useState(false);

    const renderPaymentDetail = () => {
        switch (methodSelected) {
            case "cod":
                return "Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.";
            case "debit":
                return <CreditCardPayment />;
            default:
                return "Đang cập nhập ....";
        }
    }

    const handlePayment = () => {
        if (methodSelected == "cod") {
            onSelectPaymentMethod(methodSelected)
            return;
        }
        // thực hiện thanh toán
        setIsVisibleModelPayment(true);
        // gọi hàm onSelectPaymentMethod

    }
    return (
        <>


            <Card className="mt-3">
                <Title level={4}>Phương thúc thanh toán</Title>
                <List
                    dataSource={methods}
                    renderItem={(item) => <>
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <Radio
                                        onChange={() => setMethodSelected(item.key)}
                                        checked={item.key === methodSelected}
                                    >
                                        {item.title}
                                    </Radio>
                                }
                                description={item.key === methodSelected && renderPaymentDetail()}
                            />
                        </List.Item>
                    </>
                    }
                />

                <Button
                    className="mt-3"
                    type="primary"
                    onClick={handlePayment}
                >
                    Tiếp tục</Button>
            </Card>
            <Modal
                open={isVisibleModelPayment}
                onOk={() => setIsVisibleModelPayment(false)}
                onCancel={() => setIsVisibleModelPayment(false)}
            >
                Đang cập nhập....
            </Modal>
        </>
    )
}

export default PaymentMethod