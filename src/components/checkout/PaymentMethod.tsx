import { Button, List, Modal, Radio, Typography } from "antd";
import { useState } from "react";
import { TbArrowRight } from "react-icons/tb";
import Section from "../home/Section";
import { useAppSelector } from "@/redux/hook";

interface IProps {
    onSelectPaymentMethod: (value: any) => void
}

export const methods = [
    {
        key: "cod",
        title: "Thanh toán khi nhận hàng"
    },
    {
        key: "tt",
        title: "Thanh toán bằng thẻ nội địa"
    },
]

const { Title } = Typography
const PaymentMethod = (props: IProps) => {
    const { onSelectPaymentMethod } = props;
    const [methodSelected, setMethodSelected] = useState("cod");
    const isAuthentication = useAppSelector(state => state.auth.isAuthenticated);
    const renderPaymentDetail = () => {
        switch (methodSelected) {
            case "cod":
                return "Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.";
            case "tt":
                return "Thanh toán chuyển khoản bằng thẻ ngân hàng nội địa.";
        }
    }

    return (
        <>
            <Section>
                <Title level={4}>Phương thúc thanh toán</Title>
                <List
                    dataSource={methods}
                    renderItem={(item) => <>
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <Radio
                                        disabled={(item.key != "cod" && (item.key == "tt" && !isAuthentication))}
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
                    onClick={() => onSelectPaymentMethod(methodSelected)}
                    icon={<TbArrowRight size={16} />}
                    iconPosition="end"
                >
                    Tiếp tục
                </Button>
            </Section>
        </>
    )
}

export default PaymentMethod