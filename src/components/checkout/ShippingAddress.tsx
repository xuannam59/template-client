import { Button, Card, Divider, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import AddNewAddress from "../address/AddNewAddress";
import { useAppSelector } from "@/redux/hook";
import { TbCheck, TbCheckbox, TbCircleCheckFilled, TbEdit, TbTrash } from "react-icons/tb";
import { IUserAddress } from "@/types/backend";

interface IProps {
    onSelectAddress: (val: any) => void
}

const { Title, Paragraph } = Typography;
const ShippingAddress = (props: IProps) => {
    const userAddress = useAppSelector(state => state.cart.userAddress);
    const { onSelectAddress } = props
    const [addressSelected, setAddressSelected] = useState<IUserAddress>();

    useEffect(() => {
        if (userAddress && userAddress.length > 0) {
            const item = userAddress.find(element => element.isDefault);
            item && setAddressSelected(item);
        }
    }, [userAddress]);
    console.log(addressSelected);
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
                    renderItem={item => <>
                        <List.Item>
                            <a>
                                <Card
                                    className={`card-userAddress ${item._id === addressSelected?._id && "active"}`}
                                    color="#e0e0e0"
                                    onClick={() => setAddressSelected(item)}
                                >
                                    <div className="d-flex justify-content-between">
                                        <Title level={5}>{item.name}</Title>
                                        {
                                            item._id === addressSelected?._id &&
                                            <TbCheck size={22} color="#6252CD" />
                                        }
                                    </div>
                                    <Paragraph ellipsis={{ rows: 1 }}>
                                        {item.homeNo} - {item.ward} - {item.district} - Tỉnh {item.province}
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
                                            >Xoá</Button>
                                        </div>
                                    </div>
                                </Card>
                            </a>
                        </List.Item>
                    </>}
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