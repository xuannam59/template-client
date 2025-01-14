import { callRemoveProductToCart } from '@/apis/api';
import { useAppDispatch } from '@/redux/hook';
import { doGetCart } from '@/redux/reducers/cart.reducer';
import { Button, message, Modal, notification } from 'antd';
import { TbTrash } from 'react-icons/tb';

interface IProps {
    id: string,
}

const ButtonRemoveCartItem = (props: IProps) => {
    const { id } = props
    const dispatch = useAppDispatch()
    const handleRemoveCartItem = async (id: string) => {
        try {
            const res = await callRemoveProductToCart(id);
            if (res.data) {
                dispatch(doGetCart(res.data));
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
            icon={<TbTrash size={22} />}
            danger type="text"
            onClick={() => Modal.confirm({
                title: "Xác nhận",
                content: "Bạn chắc chắn muốn xoá sản phẩm này",
                onOk: async () => {
                    await handleRemoveCartItem(id);
                }
            })}
        />
    )
}

export default ButtonRemoveCartItem