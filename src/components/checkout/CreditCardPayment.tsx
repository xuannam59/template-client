import { Button, DatePicker, Form, Input, Typography } from "antd"


const { Paragraph } = Typography
const CreditCardPayment = () => {
    const [form] = Form.useForm();


    const handlePayment = () => {

    }
    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={handlePayment}
            >
                <Form.Item
                    name="cardNumber"
                    label="Card name"
                >
                    <Input
                        maxLength={19}
                    />
                </Form.Item>
                <Form.Item
                    name="cardName"
                    label="Card Name"
                >
                    <Input />
                </Form.Item>
                <div className="row">
                    <div className="col">
                        <Form.Item
                            name="expiryDate"
                            label="Expiry Date"
                        >
                            <DatePicker mode="date" style={{ width: "100%" }} format={"MM/YY"} />
                        </Form.Item>
                    </div>
                    <div className="col">
                        <Form.Item
                            name="cvv"
                            label="CVV"
                        >
                            <Input.Password maxLength={3} visibilityToggle={false} />
                        </Form.Item>
                    </div>
                </div>
            </Form>

            <Paragraph type="secondary">
                Thông tin thanh toán sẽ không được lưu trên website của chung tôi
                và không được chia sẻ với bất kỳ bên thứ 3 nào khác
            </Paragraph>
            <div className="mt-2">
                <Button type="primary">Thêm thẻ</Button>
            </div>
        </>
    )
}

export default CreditCardPayment