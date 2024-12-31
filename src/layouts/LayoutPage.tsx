import FooterPage from "@/components/home/FooterPage"
import HeaderPage from "@/components/home/HeaderPage"
import { Layout } from "antd"
import { Outlet } from "react-router"

const { Content } = Layout
const LayoutPage = () => {
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <HeaderPage />

                <Content>
                    <Outlet />
                </Content>

                <FooterPage />
            </Layout>
        </>
    )
}

export default LayoutPage