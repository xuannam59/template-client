import PersonalInformation from "@/components/user/PersonalInformation";
import { Tabs, TabsProps, Typography } from "antd";
import { TabsPosition } from "antd/es/tabs";
import { useEffect, useState } from "react";
import { TbUserFilled } from "react-icons/tb";

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
            icon: <TbUserFilled size={20} />,
            children: <PersonalInformation />,
        }
    ]
    return (
        <div className="container bg-white mt-4 mb-4 p-3">
            <Title level={2} type="secondary">Thông tin</Title>
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