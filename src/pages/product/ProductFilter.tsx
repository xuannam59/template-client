import { VND } from "@/utils/handleCurrency";
import { Button, Card, Drawer, Slider, SliderSingleProps, Space, Typography } from "antd";
import { useState } from "react";
import { IFilter } from "./ProductList";

interface IProps {
    onFilter: (value: IFilter) => void
    open: boolean;
    onClose: () => void;
}

const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => value && VND.format(value);

const { Text, Title } = Typography
const ProductFilter = (props: IProps) => {
    const { open, onClose, onFilter } = props
    const maxPrice = 100000000
    const [price, setPrice] = useState([0, maxPrice / 2]);
    const [ram, setRam] = useState([]);
    const [chip, setChip] = useState([]);
    const [ssd, setSsd] = useState([]);

    return (
        <>
            <Drawer
                title="Bộ lọc"
                onClose={onClose}
                open={open}
                footer={<>
                    <Button
                        type="primary"
                        size="large"
                        style={{ width: "100%" }}
                        onClick={() => {
                            onFilter({ chip, ram, ssd, price })
                            onClose()
                        }}
                    >
                        Lọc sản phẩm
                    </Button>
                </>}
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
                        <Text type="secondary">{VND.format(price[0])} - {VND.format(price[1])}</Text>
                    </Space>
                    <Slider
                        className="me-5"
                        tooltip={{ formatter }}
                        defaultValue={[price[0], price[1]]}
                        range
                        min={0}
                        onChangeComplete={(value) => {
                            setPrice(value);
                        }}
                        max={maxPrice}
                    />
                </>
            </Drawer>
        </>
    )
}

export default ProductFilter