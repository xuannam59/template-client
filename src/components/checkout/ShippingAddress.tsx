import { Button, Divider } from "antd";
import { useState } from "react";
import AddNewAddress from "../address/AddnewAddress";

interface IProps {
    onSelectAddress: (val: any) => void
}

const ShippingAddress = (props: IProps) => {
    const { onSelectAddress } = props
    const [addressSelected, setAddressSelected] = useState("");

    return (
        <>
            <Button
                onClick={() => onSelectAddress(addressSelected)}
            >Địa điểm giao hàng
            </Button >
            <Divider />

            <div className="mt-4">
                <AddNewAddress />
            </div>
        </>
    )
}

export default ShippingAddress