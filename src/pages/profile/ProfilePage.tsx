
import { Tabs, TabsProps, Typography } from "antd";
import { TabsPosition } from "antd/es/tabs";
import { useEffect, useState } from "react";
import { TbLock, TbPackage, TbUser } from "react-icons/tb";
import InfoOrder from "./InfoOrder";
import ResetPassword from "./ResetPassword";
import PersonalInformation from "./PersonalInformation";

const { Title } = Typography
const ProfilePage = () => {
    const [tabPosition, setTabPosition] = useState<TabsPosition>('left');

    useEffect(() => {
        const WIDTH = window ? window.innerWidth : undefined
        if (WIDTH) {
            setTabPosition(WIDTH < 768 ? "top" : "left")
        }
    }, []);

    const userTabs: TabsProps["items"] = [
        {
            key: 'edit',
            label: 'Thông tin người dùng',
            icon: <TbUser size={20} />,
            children: <PersonalInformation />,
        },
        {
            key: 'order',
            label: 'Thông tin đơn hàng',
            icon: <TbPackage size={20} />,
            children: <InfoOrder />,
        },
        {
            key: 'restPassword',
            label: 'Đổi mật khẩu',
            icon: <TbLock size={20} />,
            children: <ResetPassword />,
        }
    ]
    return (
        <div className="container bg-white mt-4 mb-4 p-3 rounded">
            <Title level={2} type="secondary">Tài khoản</Title>
            <div className="mt-4">
                <Tabs
                    tabPosition={tabPosition}
                    items={userTabs}
                />
            </div>
        </div>
    )
}

export default ProfilePage