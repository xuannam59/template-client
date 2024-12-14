import { Layout } from "antd"
import HeaderPage from "./HeaderPage"
import { Outlet } from "react-router"
import FooterPage from "./FooterPage"

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