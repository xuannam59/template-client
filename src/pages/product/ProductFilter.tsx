import { VND } from "@/utils/handleCurrency";
import { Card, Drawer, Slider, SliderSingleProps, Space, Typography } from "antd";
import { useState } from "react";

interface IProps {
    open: boolean;
    maxPrice: number;
    onClose: () => void;
}

const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => value && VND.format(value);

const { Paragraph, Text, Title } = Typography
const ProductFilter = (props: IProps) => {
    const { open, onClose, maxPrice } = props
    const [leftPrice, setLeftPrice] = useState(0);
    const [rightPrice, setRightPrice] = useState(maxPrice / 2);
    return (
        <>
            <Drawer
                title="Bộ lọc"
                onClose={onClose}
                open={open}
            >
                <Title level={5} className="m-0">
                    CPU
                </Title>
                <Title level={5} className="m-0">
                    Dung lượng RAM
                </Title>
                <Title level={5} className="m-0">Dung lượng ổ cứng</Title>
                <>
                    <Space>
                        <Title level={5} className="m-0"> Giá : </Title>
                        <Text type="secondary">{VND.format(leftPrice)} - {VND.format(rightPrice)}</Text>
                    </Space>
                    <Slider
                        tooltip={{ formatter }}
                        defaultValue={[leftPrice, rightPrice]}
                        range
                        min={0}
                        onChangeComplete={(value) => {
                            setLeftPrice(value[0])
                            setRightPrice(value[1])
                        }}
                        max={maxPrice}
                    />
                </>
            </Drawer>
        </>
    )
}

export default ProductFilter