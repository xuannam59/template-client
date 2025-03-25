import { Button, Result } from "antd";
import { useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển."
                extra={<Button type="primary" onClick={() => navigate("/")}>Quay về trang chủ</Button>}
            />
        </div>
    );
};

export default NotFound;
