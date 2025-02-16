import { computerConfiguration } from "@/constants/appInfos";
import { VND } from "@/utils/handleCurrency";
import { Button, Drawer, Slider, SliderSingleProps, Space, Typography } from "antd";
import { useState } from "react";
import ListProductFilter from "./ListProductFilter";
import { IFilter } from "./ProductList";
import { TbTrash } from "react-icons/tb";

interface IProps {
    onFilter: (value: IFilter) => void
    open: boolean;
    onClose: () => void;
}

const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => value && VND.format(value);

const { Text, Title } = Typography
const ProductFilter = (props: IProps) => {
    const { open, onClose, onFilter } = props
    const maxPrice = 100000000;
    const [price, setPrice] = useState<number[]>([]);
    const [filters, setFilters] = useState<{
        ram: string[],
        chip: string[],
        ssd: string[]
    }>({
        ram: [],
        chip: [],
        ssd: []
    });

    return (
        <>
            <Drawer
                title={<div className="d-flex justify-content-between align-items-center">
                    <span>Lọc Sản phẩm </span>
                    {(filters.chip.length > 0
                        || filters.ram.length > 0
                        || filters.ssd.length > 0
                        || price.length > 0) &&
                        <Button
                            color="danger"
                            variant="solid"
                            icon={<TbTrash size={18} />}
                            onClick={() => {
                                setFilters({
                                    ram: [],
                                    chip: [],
                                    ssd: []
                                });
                                setPrice([])
                            }}
                        >
                            Bỏ lựa chọn
                        </Button>
                    }
                </div>}
                onClose={onClose}
                open={open}

                footer={<>
                    <Button
                        type="primary"
                        size="large"
                        style={{ width: "100%" }}
                        onClick={() => {
                            onFilter({
                                chip: filters.chip,
                                ram: filters.ram,
                                ssd: filters.ssd,
                                price
                            })
                            onClose()
                        }}
                    >
                        Lọc sản phẩm
                    </Button>
                </>}
            >
                {computerConfiguration.map(item => {
                    return (
                        <ListProductFilter
                            key={item.key}
                            title={item.title}
                            items={item.value}
                            filterKey={item.key as keyof typeof filters}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    );
                })}

                <>
                    <Space>
                        <Title level={5} className="m-0"> Giá : </Title>
                        <Text type="secondary">{VND.format(price[0] ?? 0)} - {VND.format(price[1] ?? maxPrice / 2)}</Text>
                    </Space>
                    <Slider
                        className="me-5"
                        tooltip={{ formatter }}
                        defaultValue={[0, maxPrice / 2]}
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