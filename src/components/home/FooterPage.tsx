import { Layout } from "antd"

const { Footer } = Layout

const FooterPage = () => {
    return (
        <Footer style={{
            textAlign: 'center',
            backgroundColor: "#000000",
            color: '#fff',
        }} >
            JunKay ©{new Date().getFullYear()} Copyright Xuan Nam
        </Footer>
    )
}

export default FooterPage