import { callUpdateOrder } from "@/apis/api";
import { Button, notification, Result } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router"

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get("orderCode");
    const status = searchParams.get("status");
    const _id = searchParams.get("_id");
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        if (status === "PAID") {
            handleUpdateOrder();
        }
    }, []);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            navigate("/");
        }

    }, [countdown, navigate]);

    const handleUpdateOrder = async () => {
        if (orderId && _id) {
            const res = await callUpdateOrder(_id, orderId);
            if (!res.data) {
                notification.error({
                    message: "Cập nhập đơn hàng thất bại!",
                    description: res.message,
                })
            }
        }
    }
    return (<>
        <div
            className="d-flex justify-content-center align-items-center"
        >
            <Result
                key={_id}
                status={status === "PAID" ? "success" : "error"}
                title={status === "PAID" ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
                subTitle={`Cảm ơn bạn đã mua hàng bên Shop JunKun.
                    ${status === "CANCELLED" ? "Vùi lòng hãy thử lại" : ""}`}
                extra={[
                    <Button type="primary" onClick={() => navigate("/")}>
                        Quay về trang chủ ({countdown}s)
                    </Button>,
                ]}
            />
        </div>
    </>)
}

export default PaymentStatus