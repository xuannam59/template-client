import { Button, Divider, Form, Input, Typography } from "antd"
import { useState } from "react";
import { Link } from "react-router";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSignUp = (value: any) => {
        setIsLoading(true)
        try {
            console.log(value)
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

                    <Input.Password placeholder="Phone" allowClear />
                </Form.Item>
            </Form>

            <Button
                loading={isLoading}
                onClick={(() => form.submit())}
                style={{
                    width: "100%",
                    background: "#6252cd",
                    color: "white",
                    height: "36px"
                }}
            >Sign up</Button>

            <Divider plain>or</Divider>
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