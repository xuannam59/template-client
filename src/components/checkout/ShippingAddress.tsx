import { Button, Card, Divider, List, message, Modal, notification, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import AddNewAddress from "../address/AddNewAddress";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TbCheck, TbCheckbox, TbCircleCheckFilled, TbEdit, TbTrash } from "react-icons/tb";
import { IUserAddress } from "@/types/backend";
import { callDeleteAddress } from "@/apis/api";
import { doGetCart } from "@/redux/reducers/cart.reducer";

interface IProps {
    onSelectAddress: (val: any) => void
}

const { Title, Paragraph } = Typography;
const ShippingAddress = (props: IProps) => {
    const userAddress = useAppSelector(state => state.cart.userAddress);
    const { onSelectAddress } = props
    const [addressSelected, setAddressSelected] = useState<IUserAddress>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userAddress && userAddress.length > 0) {
            const item = userAddress.find(element => element.isDefault);
            item && setAddressSelected(item);
        }
    }, [userAddress]);

    const handleDeleteAddress = async (id: string) => {
        try {
            const res = await callDeleteAddress(id);
            if (res.data) {
                dispatch(doGetCart(res.data));
                message.success("Xoá địa chỉ thành công");
            } else {
                notification.error({
                    message: "Error",
                    description: res.message
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Card className="mt-3">
                <Title level={4}>Lựa chọn một địa điểm giao hàng</Title>
                <Paragraph type="secondary">
                    Địa chỉ bạn muốn sử dụng có hiển thị bên dưới không? Nếu có, hãy chọn địa chỉ tương ứng.
                    Hoặc bạn có thể tạo một địa chỉ giao hàng mới. (tối đa 2 địa chỉ)
                </Paragraph>
                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={userAddress}
                    renderItem={item => {
                        const address = `${item.homeNo ? `${item.homeNo} - ` : ""} 
                        ${item.ward} - ${item.district} - Tỉnh ${item.province}`;
                        return <>
                            <List.Item>
                                <a>
                                    <Card
                                        className={`card-userAddress ${item._id === addressSelected?._id && "active"}`}
                                        color="#e0e0e0"
                                        onClick={() => setAddressSelected(item)}
                                    >
                                        <div className="d-flex justify-content-between">
                                            <Paragraph ellipsis={{ rows: 1, tooltip: item.name }}>
                                                Tên:  <strong>{item.name}</strong>
                                            </Paragraph>
                                            {
                                                item._id === addressSelected?._id &&
                                                <TbCheck size={22} color="#6252CD" />
                                            }
                                        </div>
                                        <Paragraph ellipsis={{ rows: 1, tooltip: address }}>
                                            Địa chỉ: <strong>{address}</strong>
                                        </Paragraph>
                                        <Paragraph>
                                            Số điện thoại: <strong>{item.phoneNumber}</strong>
                                        </Paragraph>
                                        <div className="row">
                                            <div className="col">
                                                <Button
                                                    type="link"
                                                    style={{ width: "100%" }}
                                                    icon={<TbEdit size={22} />}
                                                >Chỉnh sửa</Button>
                                            </div>
                                            <div className="col">
                                                <Button
                                                    type="text"
                                                    danger
                                                    style={{ width: "100%" }}
                                                    icon={<TbTrash size={22} />}
                                                    onClick={() => Modal.confirm({
                                                        title: "Xác nhận",
                                                        content: "Bạn chắc chắn muốn xoá địa chỉ này",
                                                        onOk: async () => {
                                                            await handleDeleteAddress(item._id);
                                                        }
                                                    })}
                                                >Xoá</Button>
                                            </div>
                                        </div>
                                    </Card>
                                </a>
                            </List.Item>
                        </>
                    }
                    }
                />
                <div className="mt-3">
                    <Button
                        onClick={() => onSelectAddress(addressSelected)}
                    >Địa điểm giao hàng
                    </Button >
                </div>
            </Card>

            <div className="mt-3">
                <AddNewAddress />
            </div>
        </>
    )
}

export default ShippingAddress