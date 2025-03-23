import ListOrder from "@/components/profile/ListOrder";
import { Tabs, TabsProps } from "antd";
import { TbCircleCheck, TbClock, TbPackageOff, TbTruck, TbTruckReturn } from "react-icons/tb";

const InfoOrder = () => {
    const orderTabs: TabsProps["items"] = [
        {
            key: 'pending',
            label: 'Chờ xác nhận',
            icon: <TbClock size={20} />,
            children: <ListOrder
                status={0}
            />,
        },
        {
            key: 'processing',
            label: 'Chờ giao hàng',
            icon: <TbTruck size={20} />,
            children: <ListOrder
                status={1}
            />,
        },
        {
            key: 'shipped',
            label: 'Đã giao',
            icon: <TbCircleCheck size={20} />,
            children: <ListOrder
                status={2}
            />,
        },
        {
            key: 'returned',
            label: 'Trả hàng',
            icon: <TbTruckReturn size={20} />,
            children: <ListOrder
                status={3}
            />,
        },
        {
            key: 'cancelled',
            label: 'Đã huỷ',
            icon: <TbPackageOff size={20} />,
            children: <ListOrder
                status={4}
            />,
        }
    ]

    return (
        <Tabs
            tabPosition={"top"}
            items={orderTabs}
        />
    )
}

export default InfoOrder