import { callGetProducts } from "@/apis/api";
import ProductItem from "@/components/product/ProductItem";
import { IProducts } from "@/types/backend";
import { Breadcrumb, Button, Dropdown, Layout, MenuProps, Pagination, PaginationProps, Skeleton, Space, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { PiChartLineDown, PiChartLineUp } from "react-icons/pi";
import { TbChevronDown } from "react-icons/tb";
import { Link, useParams } from "react-router"

const { Text, Title } = Typography;
const ProductSearch = () => {
    const { key } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<IProducts[]>([]);
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(15);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState("-createdAt");

    useEffect(() => {
        fetchProductByFilter()
    }, [current, sort, key]);

    const fetchProductByFilter = async () => {
        setIsLoading(true)
        try {
            let query = `&slug=${key}&sort=${sort}`
            const res = await callGetProducts(`current=${current}&pageSize=${pageSize}${query}`);
            if (res.data) {
                setProducts(res.data.result);
                setTotalItems(res.data.meta.totalItems);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const items: MenuProps['items'] = [
        {
            key: 'priceDescend',
            label: "Giá giảm dần",
            icon: <PiChartLineDown size={20} />,
            onClick: () => {
                setSort("-price");
            }
        },
        {
            key: 'priceAscend',
            label: "Giá tăng dần",
            icon: <PiChartLineUp size={20} />,
            onClick: () => {
                setSort("price");
            }
        }
    ];

    const onChangePagination: PaginationProps['onChange'] = (currentPage: number) => {
        if (currentPage !== current) {
            setCurrent(currentPage);
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb items={[
                                {
                                    key: 1,
                                    title: <Link to={"/"}>Trang chủ</Link>
                                },
                                {
                                    key: 2,
                                    title: key
                                }
                            ]} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <Title level={4}>
                                Kết quả tìm kiếm:
                                <span > {key}</span>
                            </Title>
                        </div>
                    </div>
                    <Layout className='mt-3'>
                        <Content className='mb-3' >
                            <div className="row bg-white rounded p-2">
                                <div className="col d-flex align-items-center">
                                    <Text type='secondary'>
                                        {(current - 1) * products.length + 1}
                                        -
                                        {products.length * current} của {totalItems} kết quả
                                    </Text>
                                </div>
                                <div className="col text-end">
                                    <Space>
                                        <div className="d-none d-md-block">
                                            <Dropdown menu={{ items }}>
                                                <Button
                                                    onClick={() => setSort("-createdAt")}
                                                    icon={<TbChevronDown size={16} />}
                                                    iconPosition='end'
                                                >
                                                    Sắp xếp theo
                                                </Button>
                                            </Dropdown>
                                        </div>
                                    </Space>
                                </div>
                            </div>
                            {isLoading ?
                                <Skeleton />
                                :
                                <div className="row mt-3">
                                    {products.length > 0 ?
                                        products.map(item =>
                                            <ProductItem
                                                key={item._id}
                                                item={item}
                                            />
                                        )
                                        :
                                        <Text className='p-3 mb-2 bg-danger-subtle text-danger-emphasis'>
                                            Không tìm thấy sản phẩm
                                        </Text>
                                    }
                                </div>
                            }
                            <div className="mt-4">
                                {totalItems > pageSize &&
                                    <Pagination
                                        current={current}
                                        total={totalItems}
                                        pageSize={pageSize}
                                        onChange={onChangePagination}
                                        align='center'
                                    />
                                }
                            </div>
                        </Content>
                    </Layout>
                </div>
            </div>
        </>
    )
}

export default ProductSearch