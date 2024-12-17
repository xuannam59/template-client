import { callForgotPassword } from '@/apis/api';
import { Button, Form, Input, notification, Typography } from 'antd'
import { useState } from 'react'

interface IProps {
    setCurrent: any;
    setEmail: any;
}

const { Title, Paragraph } = Typography

const EnterEmail = (props: IProps) => {
    const { setCurrent, setEmail } = props
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const onFinish = async (values: any) => {
        const { email } = values
        setIsLoading(true)
        try {
            const res = await callForgotPassword(email);
            if (res.data) {
                setCurrent(1);
                setEmail(res.data.email);
            } else {
                notification.error({
                    message: "Error",
                    description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    duration: 5
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Title level={2}>Forgot your password?</Title>
            <Paragraph type="secondary">Don’t worry, happens to all of us.
                Enter your email below to recover your password</Paragraph>
            <Form
                layout='vertical'
                onFinish={onFinish}
                form={form}
                disabled={isLoading}
            >
                <Form.Item
                    name={"email"}
                    label="Enter email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email"
                        },
                        {
                            type: "email",
                            message: "Email is not incorrect format"
                        }
                    ]}
                >

                    <Input placeholder='Enter email' allowClear />
                </Form.Item>
            </Form>
            <Button
                type='primary'
                onClick={() => form.submit()}
                loading={isLoading}
                style={{ width: "100%" }}
            >Next</Button>

        </>
    )
}

export default EnterEmail