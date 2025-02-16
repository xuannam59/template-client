import { callGetProducts } from '@/apis/api';
import ProductItem from '@/components/product/ProductItem';
import { IProducts } from '@/types/backend';
import { Breadcrumb, Button, Dropdown, Layout, MenuProps, Pagination, PaginationProps, Skeleton, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { PiChartLineDown, PiChartLineUp } from 'react-icons/pi';
import { TbChevronDown, TbFilter } from 'react-icons/tb';
import { Link, useParams } from 'react-router';
import ProductFilter from './ProductFilter';

export interface IFilter {
    chip: string[],
    ram: string[],
    ssd: string[],
    price: number[]
}

const { Content } = Layout
const { Text } = Typography;
const ProductList = () => {
    const { slug } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<IProducts[]>([]);
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(15);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState("-createdAt");
    const [filter, setFilter] = useState<IFilter>({
        chip: [],
        ram: [],
        ssd: [],
        price: []
    });
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        fetchProductByFilter();
    }, [slug, current, sort, filter]);

    useEffect(() => {
        setFilter({
            chip: [],
            ram: [],
            ssd: [],
            price: []
        });
        setCurrent(1);
    }, [slug]);

    const fetchProductByFilter = async () => {
        setIsLoading(true)
        try {
            let query = `&sort=${sort}`
            Object.entries(filter).forEach(([key, value]) => {
                if (value.length > 0) {
                    query += `&${key}=${value.join(',')}`
                }
            })
            const res = await callGetProducts(`current=${current}&pageSize=${pageSize}&categorySlug=${slug}${query}`);
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

    return (<>
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
                                title: slug
                            }
                        ]} />
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
                                    <Dropdown menu={{ items }}>
                                        <Button
                                            onClick={() => setSort("")}
                                            icon={<TbChevronDown size={16} />}
                                            iconPosition='end'
                                        >
                                            Sắp xếp theo

                                        </Button>
                                    </Dropdown>
                                    <Button
                                        onClick={() => setOpenDrawer(true)}
                                        icon={<TbFilter size={20} />}
                                    >
                                        Bộ lọc
                                    </Button>
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
        <ProductFilter
            onFilter={(value) => setFilter(value)}
            open={openDrawer}
            onClose={() => {
                setOpenDrawer(false)
            }}
        />
    </>
    )
}

export default ProductList