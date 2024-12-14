import LoginSocial from "@/components/auth/LoginSocial";
import { Button, Checkbox, Divider, Form, Input, Typography } from "antd"
import { useState } from "react";
import { Link } from "react-router";

interface ILogin {
    email: string,
    password: string,
}

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const [form] = Form.useForm();
    const handleLogin = (value: ILogin) => {
        setIsLoading(true)
        try {
            console.log(value)
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
                    <Link to="" className="text-end text text-decoration-underline">Forget password</Link>
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