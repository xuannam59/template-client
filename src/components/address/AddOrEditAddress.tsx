import { callAddNewAddress, callEditAddress } from "@/apis/api";
import { useAppDispatch } from "@/redux/hook";
import { doGetCart } from "@/redux/reducers/cart.reducer";
import { ISelectModel, IUserAddress } from "@/types/backend";
import { replaceName } from "@/utils/replaceName";
import { Button, Card, Checkbox, Form, Input, message, Modal, notification, Select, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface IProps {
    isOpenModal: boolean
    isEditAddress?: IUserAddress
    onCancel: () => void
}

const OPENAPILOCATION = "https://open.oapi.vn/location"

const AddOrEditAddress = (props: IProps) => {
    const { isOpenModal, isEditAddress, onCancel } = props;
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

    useEffect(() => {
        if (isEditAddress) {
            form.setFieldsValue(isEditAddress);
            handleFormatForm(isEditAddress)
        }
    }, [isEditAddress]);

    const fetchLocationData = async (url: string, id?: string) => {
        const api = `${OPENAPILOCATION}/${url}${id ? `/${id}` : ""}?page=0&size=1000`
        try {
            const res = await axios.get(api);
            if (res.data.data && res.data) {
                const data = res.data.data.map((item: any) => { return { label: item.name, value: item.id } });
                const value: any = {};
                value[url] = data;
                setLocationData((prev) => ({ ...prev, [url]: data }));
                return data;
            }
            return [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const handleFormatForm = async (values: IUserAddress) => {
        const provinceSelect = locationData.provinces.find(item => item.label === values.province);
        if (provinceSelect) {
            form.setFieldValue("province", provinceSelect.value);
            const districts = await fetchLocationData("districts", provinceSelect.value);
            const districtSelect = districts.find((item: ISelectModel) => item.label === values.district);
            if (districtSelect) {
                form.setFieldValue("district", districtSelect.value);
                const wards = await fetchLocationData("wards", districtSelect.value);
                const wardSelect = wards.find((item: ISelectModel) => item.label === values.ward);
                if (wardSelect) {
                    form.setFieldValue("ward", wardSelect.value);
                }
            }
        }
    }

    const handleAddOrEditAddress = async (values: IUserAddress) => {
        let { name, phoneNumber, homeNo, province, district, ward, isDefault } = values
        setIsLoading(true);

        province = locationData.provinces.find(item => item.value == province)?.label ?? "";
        district = locationData.districts.find(item => item.value == district)?.label ?? "";
        ward = locationData.wards.find(item => item.value == ward)?.label ?? "";
        try {
            const apiCall = isEditAddress
                ? callEditAddress(isEditAddress._id, name, phoneNumber, homeNo, province, district, ward, isDefault)
                : callAddNewAddress(name, phoneNumber, homeNo, province, district, ward, isDefault);

            const res = await apiCall;
            if (res.data) {
                dispatch(doGetCart(res.data));
                message.success(isEditAddress ? "Cập nhật địa chỉ thành công" : "Thêm mới địa chỉ thành công");

                form.resetFields();
                setLocationData({
                    provinces: locationData.provinces,
                    districts: [],
                    wards: []
                })
                onCancel()
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
            <Modal
                title={`${isEditAddress ? "Cập nhập" : "Thêm mới"} địa chỉ`}
                open={isOpenModal}
                onOk={() => form.submit()}
                onCancel={onCancel}
                okText={isEditAddress ? "Cập nhập" : "Tạo mới"}
            >
                <Form
                    layout="vertical"
                    disabled={isLoading}
                    form={form}
                    onFinish={handleAddOrEditAddress}
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
                    <div className="row">
                        <div className="col">
                            <Form.Item
                                name={"homeNo"}
                                label={"Số nhà"}
                            >
                                <Input allowClear placeholder="Số nhà" />
                            </Form.Item>
                        </div>
                        <div className="col">
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
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
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
                        </div>
                        <div className="col">
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
                        </div>
                    </div>
                    <Form.Item
                        name="isDefault"
                        valuePropName="checked"
                    >
                        <Checkbox>Địa chỉ mặc định</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddOrEditAddress