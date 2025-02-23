import { callRemoveProductToCart } from '@/apis/api';
import { useAppDispatch } from '@/redux/hook';
import { doRemoveProduct } from '@/redux/reducers/cart.reducer';
import { Button, message, Modal, notification } from 'antd';
import { TbTrash } from 'react-icons/tb';

interface IProps {
    id: string,
    color: string
}

const ButtonRemoveCartItem = (props: IProps) => {
    const { id, color } = props
    const dispatch = useAppDispatch()
    const handleRemoveCartItem = async () => {
        try {
            const data = { productId: id, color }
            const res = await callRemoveProductToCart(data.productId, data.color);
            if (res.data) {
                dispatch(doRemoveProduct(data));
                message.success("xoá thành công sản phẩm khỏi giỏ hàng");
            } else {
                notification.error({
                    message: "Error delete",
                    description: res.message
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button
            icon={<TbTrash size={20} />}
            danger type="text"
            onClick={() => Modal.confirm({
                title: "Xác nhận",
                content: "Bạn chắc chắn muốn xoá sản phẩm này",
                onOk: async () => {
                    await handleRemoveCartItem();
                }
            })}
        />
    )
}

export default ButtonRemoveCartItem