import { callDeleteAddress } from "@/apis/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { doGetCart } from "@/redux/reducers/cart.reducer";
import { IUserAddress } from "@/types/backend";
import { Button, Card, List, message, Modal, notification, Typography } from "antd";
import { useEffect, useState } from "react";
import { TbArrowRight, TbCheck, TbEdit, TbPlus, TbTrash } from "react-icons/tb";
import AddOrEditAddress from "../address/AddOrEditAddress";
import Section from "../home/Section";

interface IProps {
    onSelectAddress: (val: IUserAddress | undefined) => void
}

const { Title, Paragraph } = Typography;
const ShippingAddress = (props: IProps) => {
    const { onSelectAddress } = props
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [addressSelected, setAddressSelected] = useState<IUserAddress>();
    const [isEditAddress, setIsEditAddress] = useState<IUserAddress>();
    const dispatch = useAppDispatch();
    const userAddress = useAppSelector(state => state.cart.userAddress);


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
            <Section>
                <div className="row">
                    <div className="col">
                        <Title level={4} className="">Lựa chọn một địa điểm giao hàng</Title>
                    </div>
                    <div className="col text-end">
                        {userAddress.length < 2 &&
                            <Button
                                type="primary"
                                icon={<TbPlus size={16} />}
                                onClick={() => setIsOpenModal(true)}
                            >
                                Thêm Mới
                            </Button>
                        }
                    </div>
                </div>
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
                                                    color="primary"
                                                    variant="text"
                                                    style={{ width: "100%" }}
                                                    icon={<TbEdit size={22} />}
                                                    onClick={() => {
                                                        setIsEditAddress(item)
                                                        setIsOpenModal(true);
                                                    }}
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
                        disabled={userAddress.length === 0}
                        onClick={() => onSelectAddress(addressSelected)}
                        type="primary"
                        icon={<TbArrowRight size={16} />}
                        iconPosition="end"
                    >Tiếp tục
                    </Button >
                </div>
            </Section>
            <AddOrEditAddress
                isOpenModal={isOpenModal}
                isEditAddress={isEditAddress}
                onCancel={() => {
                    setIsEditAddress(undefined);
                    setIsOpenModal(false)
                }}
            />
        </>
    )
}

export default ShippingAddress