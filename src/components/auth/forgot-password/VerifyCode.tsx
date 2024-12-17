import { callForgotPassword, callVerifyCode } from '@/apis/api';
import { Button, Form, Input, notification, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { TbArrowNarrowLeft } from 'react-icons/tb';

interface IProps {
    email: string,
    setOtpCode: any,
    setCurrent: any,
}
const { Title, Paragraph, Link, Text } = Typography
const VerifyCode = (props: IProps) => {
    const { email, setCurrent, setOtpCode } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);

    useEffect(() => {
        if (!timeLeft) return;

        const times = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(times);
    }, [timeLeft]);

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        const { otp } = values
        setIsLoading(true);
        try {
            const res = await callVerifyCode(email, otp);
            if (res.data) {
                setCurrent(2);
                setOtpCode(otp);
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

    const onResendCode = async () => {
        try {
            if (timeLeft === 0) {
                const res = await callForgotPassword(email);
                if (res.data) {
                    notification.success({
                        message: "Resend a new code",
                        description: "Please check your email",
                        duration: 2
                    })
                } else {
                    notification.error({
                        message: "Error",
                        description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                        duration: 5
                    })
                }
                setTimeLeft(180);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Title level={2}>Verify Code</Title>
            <Paragraph type="secondary">An authentication code has been sent to your email.</Paragraph>
            <Form
                layout='vertical'
                onFinish={onFinish}
                form={form}
                disabled={isLoading}
            >
                <Form.Item
                    name={"otp"}
                    label="Enter Code"
                    rules={[
                        {
                            required: true,
                            message: "Please input your code"
                        }
                    ]}
                    style={{ marginBottom: 0 }}
                >
                    <Input.OTP type="number" />
                </Form.Item>
                <div className='mt-2 mb-2'>
                    {timeLeft === 0 ?
                        <Link style={{ marginBottom: "14px" }} onClick={onResendCode}>Resend code</Link>
                        :
                        <Text type='secondary'> Resend a new code: {timeLeft}s</Text>
                    }

                </div>
            </Form>
            <div className="row">
                <div className="col">
                    <Button
                        type='default'
                        onClick={() => setCurrent(0)}
                        loading={isLoading}
                        style={{ width: "100%" }}
                        icon={<TbArrowNarrowLeft size={20} />}
                    >Previous</Button>
                </div>
                <div className="col">
                    <Button
                        type='primary'
                        onClick={() => form.submit()}
                        loading={isLoading}
                        style={{ width: "100%" }}
                    >Next</Button>
                </div>
            </div>

            <div className="mt-3 text-center">
                <Paragraph type='secondary'>OTP code is valid for 3 minutes</Paragraph>
            </div>
        </>
    )
}

export default VerifyCode