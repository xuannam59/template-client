import { callChangePassword } from "@/apis/api";
import { Button, Form, Input, message, notification } from "antd"
import { useState } from "react";

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
        setIsLoading(true)
        const { oldPassword, newPassword, confirmPassword } = values
        const res = await callChangePassword(oldPassword, newPassword, confirmPassword)
        if (res.data) {
            form.resetFields();
            message.success("Đổi mật khẩu thành công!")
        } else {
            notification.error({
                message: "Đổi mât khẩu lỗi!",
                description: res.message && Array.isArray(res.message) ? res.message.toString() : res.message,
                duration: 3
            })
        }
        setIsLoading(false)
    }
    return (<>
        <div className="container">
            <div className="row">
                <div className="col text-end">
                    <Button
                        onClick={() => form.submit()}
                        loading={isLoading}
                        type="primary"
                    >Đặt mật khẩu</Button>
                </div>
            </div>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                disabled={isLoading}
                style={{ maxWidth: "600px", margin: "0 auto" }}
            >
                <Form.Item
                    name="oldPassword"
                    label="Mật khẩu cũ"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng không để trống"
                        }
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu cũ" />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng không để trống"
                        },
                        { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu mới" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng không để trống"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("newPassword") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Nhập lại mật khẩu mới" />
                </Form.Item>
            </Form>
        </div>
    </>
    )
}

export default ResetPassword