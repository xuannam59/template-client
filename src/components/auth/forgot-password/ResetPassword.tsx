import { callResetPassword } from "@/apis/api";
import { Button, Form, Input, message, notification, Typography } from "antd"
import { useState } from "react";
import { useNavigate } from "react-router";

interface IProps {
    email: string;
    otp: string;
}

const { Title, Paragraph } = Typography

const ResetPassword = (props: IProps) => {
    const { email, otp } = props
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();


    const onFinish = async (value: any) => {
        const { password, confirmPassword } = value;
        setIsLoading(true);
        try {
            console.log(confirmPassword, password);
            const res = await callResetPassword(email, otp, password, confirmPassword);
            if (res.data) {
                message.success("Reset password successfully");
                navigate("/login");
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
            setIsLoading(false);
        }
    }
    return (
        <>
            <Title level={2}>Set a password</Title>
            <Paragraph type="secondary">
                your previous password has been reset. Please set a new password for your account
            </Paragraph>
            <Form
                layout='vertical'
                onFinish={onFinish}
                form={form}
                disabled={isLoading}
            >
                <Form.Item
                    name={"password"}
                    label="Enter new password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email"
                        }
                    ]}
                >

                    <Input.Password placeholder='Enter password' allowClear />
                </Form.Item>
                <Form.Item
                    name={"confirmPassword"}
                    label="Re-enter password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email"
                        }
                    ]}
                >

                    <Input.Password placeholder='Re-enter password' allowClear />
                </Form.Item>
            </Form>
            <Button
                type='primary'
                onClick={() => form.submit()}
                loading={isLoading}
                style={{ width: "100%" }}
            >Done</Button>
        </>
    )
}

export default ResetPassword