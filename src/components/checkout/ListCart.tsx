import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { cartSate, doGetCart } from "@/redux/reducers/cart.reducer";
import { IProducts } from "@/types/backend";
import { VND } from "@/utils/handleCurrency";
import { Avatar, Button, InputNumber, notification, Select, Space, Tag, Typography } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { useState } from "react";
import { TbMinus, TbPlus } from "react-icons/tb";
import ButtonRemoveCartItem from "../cart/ButtonRemoveCartItem";
import { callChangeProductType } from "@/apis/api";

const { Paragraph } = Typography

const ListCart = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();
    const productList = useAppSelector(state => state.cart.productList);

    const columns: ColumnProps<cartSate["productList"][number]>[] = [
        {
            title: "STT",
            key: "index",
            align: "center",
            render: (_, _1, index) => {
                return <>{index + 1}</>
            }
        },
        {
            title: "Sản phẩm",
            key: "product",
            width: 350,
            render: (item: cartSate["productList"][number]) => {
                return <>
                    <Space>
                        <Avatar className="d-none d-lg-block" src={item.productId.images[0]} size={52} shape="square" />
                        <Paragraph
                            ellipsis={{ rows: 2, tooltip: item.productId.title }}
                            style={{ fontSize: 13, fontWeight: 600, marginBottom: "auto" }}>
                            {item.productId.title}
                        </Paragraph>
                    </Space>
                </>
            }
        },
        {
            title: "Số lượng",
            key: "quantity",
            align: "center",
            render: (product: cartSate["productList"][number]) => {
                const productQuantity = product.productId.versions.find(item => item.color === product.color)?.quantity ?? 0;
                return <>
                    <Space
                        size={"middle"}
                        align="center" >
                        <div className="button-grounds">
                            <Button
                                loading={isLoading}
                                disabled={product.quantity <= 1}
                                type="text"
                                icon={<TbMinus size={20} />}
                                onClick={() => handleChangeProductInCart(product._id, product.quantity - 1, "quantity")}
                            />
                            <InputNumber
                                disabled={isLoading}
                                variant="borderless"
                                style={{ width: "40px" }}
                                controls={false}
                                min={1}
                                value={product.quantity}
                                max={productQuantity}
                                onBlur={(e) => {
                                    const minQuantity = Math.min(+e.target.value, productQuantity);
                                    handleChangeProductInCart(product._id, minQuantity, "quantity")
                                }}
                            />
                            <Button
                                loading={isLoading}
                                disabled={product.quantity >= productQuantity}
                                type="text"
                                icon={<TbPlus size={20} />}
                                onClick={() => handleChangeProductInCart(product._id, product.quantity + 1, "quantity")}
                            />
                        </div>
                    </Space>
                </>
            }
        },
        {
            title: "Đơn giá",
            key: "price",
            align: "center",
            dataIndex: "productId",
            render: (product: IProducts) => {
                return <>
                    {VND.format(product.price * (1 - product.discountPercentage / 100))}
                </>
            }
        },
        {
            title: "Màu Sắc",
            dataIndex: "",
            align: "center",
            key: "color",
            render: (product: cartSate["productList"][number]) => {
                const colorOptions = product.productId.versions.map(version => version.color);
                return (
                    <Select
                        disabled={isLoading}
                        value={product.color}
                        onChange={(newColor) => handleChangeProductInCart(product._id, newColor, "color")}
                        style={{ width: 70 }}
                    >
                        {colorOptions.map(color => (
                            <Select.Option key={color} value={color}>
                                <div className="d-flex align-items-center">
                                    <Tag color={color} style={{ width: 20, height: 20, border: "2px solid #2121211a" }} />
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                );
            }
        },
        {
            title: "Thành tiền",
            key: "totalAmount",
            align: "center",
            render: (item) => {
                return <>
                    {VND.format(item.quantity * item.productId.price * (1 - item.productId.discountPercentage / 100))}
                </>
            }
        },
        {
            title: "",
            key: "action",
            align: "center",
            dataIndex: "",
            render: (item: cartSate["productList"][number]) => {
                return <>
                    <ButtonRemoveCartItem id={item._id} />
                </>
            },
        }
    ];
    const handleChangeProductInCart = async (id: string, value: number | string, type: string) => {
        setIsLoading(true);
        try {
            const res = await callChangeProductType(id, value, type);
            if (res.data) {
                dispatch(doGetCart(res.data));
            } else {
                notification.error({
                    message: "Error Change quantity",
                    description: res.message
                });
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Table
                dataSource={productList}
                columns={columns}
                rowKey="_id"
                pagination={false}
                scroll={{
                    x: "max-content"
                }}
            />
        </>
    )
}

export default ListCart