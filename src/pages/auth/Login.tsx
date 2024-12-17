import { callLogin } from "@/apis/api";
import LoginSocial from "@/components/auth/LoginSocial";
import { useAppDispatch } from "@/redux/hook";
import { doLoginAction } from "@/redux/reducers/auth.reducer";
import { Button, Checkbox, Divider, Form, Input, message, notification, Typography } from "antd"
import { useState } from "react";
import { Link, useNavigate } from "react-router";

interface ILogin {
    email: string,
    password: string,
}

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();
    // const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();
    let params = new URLSearchParams(location.search);
    const callback = params?.get("callback");

    const handleLogin = async (values: ILogin) => {
        const { email, password } = values
        setIsLoading(true)
        try {
            const res = await callLogin(email, password);
            if (res.data) {
                localStorage.setItem("access_token", res.data.access_token);
                dispatch(doLoginAction(res.data.user));
                message.success("Login successfully", 3);
                navigate("/");
            } else {
                notification.error({
                    message: "Error",
                    description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    duration: 5
                })
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Typography.Title level={2} className="text-center m-0">Login</Typography.Title>
            <Typography.Paragraph type="secondary" className="text-center">Welcome To ous website</Typography.Paragraph>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleLogin}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email"
                        },
                        {
                            type: "email",
                            message: "email is incorrect format"
                        }
                    ]}
                >

                    <Input placeholder="Email" allowClear />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password"
                        },
                    ]}
                >

                    <Input.Password placeholder="password" allowClear />
                </Form.Item>
            </Form>
            <div className="mb-3 row">
                <div className="col">
                    <Checkbox
                        checked={isRemember}
                        onChange={(e) => setIsRemember(e.target.checked)}
                    >
                        Remember me
                    </Checkbox>
                </div>
                <div className="col text-end">
                    <Link to="/forgot-password"
                        className="text-end text-decoration-underline"
                        style={{ fontSize: "15px" }}
                    >Forget password</Link>
                </div>
            </div>
            <Button
                loading={isLoading}
                onClick={(() => form.submit())}
                style={{
                    width: "100%",
                    background: "#00a854",
                    color: "white",
                    height: "36px"
                }}
            >Login</Button>

            <Divider plain>or</Divider>
            <LoginSocial />

            <Typography.Paragraph
                type="secondary"
                className="text-center"
            >
                Don't have an account?
                <Link to={"/sign-up"}> Sig-up</Link>
            </Typography.Paragraph>
        </>
    )
}

export default Login