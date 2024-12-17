import EnterEmail from "@/components/auth/forgot-password/EnterEmail";
import ResetPassword from "@/components/auth/forgot-password/ResetPassword";
import VerifyCode from "@/components/auth/forgot-password/VerifyCode";
import { Typography } from "antd";
import { useState } from "react";
import { TbChevronLeft } from "react-icons/tb";
import { useNavigate } from "react-router";

const { Paragraph } = Typography
const ForgotPassword = () => {
    const [current, setCurrent] = useState(0);
    const [email, setEmail] = useState<string>("");
    const [otpCode, setOtpCode] = useState<string>("");

    const navigate = useNavigate();
    const steps = [
        {
            content: <EnterEmail
                setCurrent={setCurrent}
                setEmail={setEmail}
            />,
        },
        {
            content: <VerifyCode
                email={email}
                setOtpCode={setOtpCode}
                setCurrent={setCurrent}
            />,
        },
        {
            content: <ResetPassword
                email={email}
                otp={otpCode}
            />,
        },
    ];

    return (
        <>
            <div className="container-fluid" style={{ height: "100vh", backgroundColor: "#F0F0F0" }}>
                <div className="row">
                    <div className="d-none d-md-flex col-6 p-0 justify-content-center align-items-center"
                        style={{ height: "100vh" }}
                    >
                        <div>
                            <img src="/images/forgot-password.png" alt="" style={{ width: "400px" }} />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 p-0">
                        <div
                            className="container d-md-flex align-items-center justify-content-center"
                            style={{ height: "100vh" }}
                        >
                            <div className="col-sm-12 col-md-12 col-lg-8 bg-white p-3 rounded-3 shadow-sm">
                                <Paragraph
                                    type="secondary"
                                    className="d-flex align-items-center"
                                    onClick={() => navigate("/login")}
                                    style={{ cursor: "pointer" }}
                                >
                                    <TbChevronLeft size={18} />
                                    Back to Login
                                </Paragraph>
                                <div>{steps[current].content}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword   