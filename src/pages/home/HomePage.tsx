import { Button } from "antd"
import { Link } from "react-router"

const HomePage = () => {
    return (
        <>
            <div>HomePage</div>
            <Button ><Link to={"/login"}>Đăng nhập</Link></Button>
        </>
    )
}

export default HomePage