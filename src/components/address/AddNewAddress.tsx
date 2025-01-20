import { callAddNewAddress } from "@/apis/api";
import { useAppDispatch } from "@/redux/hook";
import { doAddNewAddress } from "@/redux/reducers/cart.reducer";
import { ISelectModel } from "@/types/backend";
import { replaceName } from "@/utils/replaceName";
import { Button, Card, Checkbox, Form, Input, message, notification, Select, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface FieldType {
    name: string;
    phoneNumber: string;
    homeNo: string;
    province: string;
    district: string;
    ward: string
    isDefault: boolean;
}

const OPENAPILOCATION = "https://open.oapi.vn/location"

const { Title } = Typography

const AddNewAddress = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [locationData, setLocationData] = useState<{
        provinces: ISelectModel[],
        districts: ISelectModel[],
        wards: ISelectModel[]
    }>({
        provinces: [],
        districts: [],
        wards: []
    });

    const dispatch = useAppDispatch()

    const [form] = Form.useForm();
    useEffect(() => {
        fetchLocationData("provinces");
    }, []);

    const fetchLocationData = async (url: string, id?: string) => {
        const api = `${OPENAPILOCATION}/${url}${id ? `/${id}` : ""}?page=0&size=1000`
        try {
            const res = await axios.get(api);
            if (res.data.data && res.data) {
                const data = res.data.data.map((item: any) => { return { label: item.name, value: item.id } });
                const value: any = {};
                value[url] = data;
                setLocationData({ ...locationData, ...value });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleAddNewAddress = async (values: FieldType) => {
        let { name, phoneNumber, homeNo, province, district, ward, isDefault } = values
        setIsLoading(true);

        province = locationData.provinces.find(item => item.value == province)?.label ?? "";
        district = locationData.districts.find(item => item.value == district)?.label ?? "";
        ward = locationData.wards.find(item => item.value == ward)?.label ?? "";
        try {
            const res = await callAddNewAddress(name, phoneNumber, homeNo, province, district, ward, isDefault);
            if (res.data) {
                dispatch(doAddNewAddress(res.data));
                message.success("Thêm mới địa chỉ thành công");
                form.resetFields();
                setLocationData({
                    provinces: locationData.provinces,
                    districts: [],
                    wards: []
                })
            } else {
                notification.error({
                    message: "Error",
                    description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
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
            <Card>
                <Title level={3}>Thêm địa chỉ mới</Title>
                <Form
                    layout="vertical"
                    disabled={isLoading}
                    form={form}
                    onFinish={handleAddNewAddress}
                    initialValues={{ isDefault: true }}
                >
                    <Form.Item
                        name={"name"}
                        label={"Tên người nhận"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng không để trống"
                            }
                        ]}
                    >
                        <Input allowClear placeholder="Tên người nhận" />
                    </Form.Item>
                    <Form.Item
                        name={"phoneNumber"}
                        label={"Số điện thoại"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng không để trống"
                            }
                        ]}
                    >
                        <Input type="tel" allowClear maxLength={10} placeholder="Số điện thoại" />
                    </Form.Item>
                    <Form.Item
                        name={"homeNo"}
                        label={"Số nhà"}
                    >
                        <Input allowClear placeholder="Số nhà" />
                    </Form.Item>
                    <Form.Item
                        name={"province"}
                        label={"Tỉnh"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng không để trống"
                            }
                        ]}
                    >
                        <Select
                            options={locationData.provinces}
                            disabled={locationData.provinces.length === 0}
                            onChange={async (value) => {
                                await fetchLocationData("districts", value)
                                form.resetFields(["district", 'ward'])
                            }
                            }
                            optionFilterProp="label"
                            filterOption={(input, option) =>
                                (replaceName(option?.label as string) ?? '').includes(
                                    replaceName(input)
                                )}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '')
                                    .toLowerCase()
                                    .localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            showSearch
                        />
                    </Form.Item>
                    <Form.Item
                        name={"district"}
                        label={"Huyện"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng không để trống"
                            }
                        ]}
                    >
                        <Select
                            disabled={locationData.districts.length === 0}
                            options={locationData.districts}
                            onChange={async (value) => {
                                await fetchLocationData("wards", value)
                            }}
                            optionFilterProp="label"
                            filterOption={(input, option) =>
                                (replaceName(option?.label as string) ?? '').includes(
                                    replaceName(input)
                                )}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '')
                                    .toLowerCase()
                                    .localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            showSearch
                        />
                    </Form.Item>
                    <Form.Item
                        name={"ward"}
                        label={"Phường, xã"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng không để trống"
                            }
                        ]}
                    >
                        <Select
                            disabled={locationData.wards.length === 0}
                            options={locationData.wards}
                            optionFilterProp="label"
                            filterOption={(input, option) =>
                                (replaceName(option?.label as string) ?? '').includes(
                                    replaceName(input)
                                )}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '')
                                    .toLowerCase()
                                    .localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            showSearch
                        />
                    </Form.Item>
                    <Form.Item
                        name="isDefault"
                        valuePropName="checked"
                    >
                        <Checkbox>Địa chỉ mặc định</Checkbox>
                    </Form.Item>
                </Form>

                <Button onClick={() => form.submit()} type="primary" >Thêm địa chỉ</Button>
            </Card>
        </>
    )
}

export default AddNewAddress