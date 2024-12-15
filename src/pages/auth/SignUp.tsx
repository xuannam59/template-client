import { callRegister } from "@/apis/api";
import { Button, Checkbox, Divider, Form, Input, message, notification, Typography } from "antd"
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAgree, setIsAgree] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSignUp = async (values: any) => {
        const { name, email, password, confirmPassword, phone } = values
        setIsLoading(true)
        try {
            const res = await callRegister(name, email, password, confirmPassword, phone);
            if (res.data) {
                message.success("Registered successful");
                navigate("/login");
            } else {
                notification.error({
                    message: "Error",
                    description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    duration: 5
                });
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Typography.Title level={2} className="text-center m-0">Sign Up</Typography.Title>
            <Typography.Paragraph type="secondary" className="text-center">Welcome To ous website</Typography.Paragraph>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSignUp}
            >
                <Form.Item
                    label="Fullname"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name"
                        },
                    ]}
                >

                    <Input placeholder="Name" allowClear />
                </Form.Item>

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

                <Form.Item
                    label="Confirm password"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: "Please input your confirmPassword"
                        },
                    ]}
                >

                    <Input.Password placeholder="Confirm password" allowClear />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone"
                        },
                    ]}
                >

                    <Input placeholder="Phone" allowClear />
                </Form.Item>
            </Form>

            <Checkbox
                checked={isAgree}
                onChange={(e) => setIsAgree(e.target.checked)}
            >I agree the term & policy</Checkbox>

            <Button
                loading={isLoading}
                onClick={(() => form.submit())}
                type="primary"
                style={{
                    width: "100%",
                    height: "36px",
                    marginTop: "8px"
                }}
                disabled={!isAgree}
            >Sign up</Button>
            <Typography.Paragraph
                type="secondary"
                className="text-center"
            >
                Did have an account?
                <Link to={"/login"}> Login</Link>
            </Typography.Paragraph>
        </>
    )
}

export default SignUp