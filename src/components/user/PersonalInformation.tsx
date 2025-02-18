import { callUpdateUser, callUploadSingleFile } from "@/apis/api";
import { useAppSelector } from "@/redux/hook";
import { handleChangeUpload } from "@/utils/functionChangeAntd";
import { Button, Form, Input, InputNumber, message, notification, Select, Upload } from "antd"
import { useEffect, useState } from "react";
import { TbCamera, TbEdit } from "react-icons/tb";

const PersonalInformation = () => {
  const [avatarList, setAvatarList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAppSelector(state => state.auth);
  const userInfo = auth.user;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(userInfo);
    if (userInfo.avatar) {
      const avatarFile = [
        {
          uid: Math.random(),
          name: userInfo.avatar,
          status: 'done',
          url: userInfo.avatar,
        }
      ]
      setAvatarList(avatarFile);
    }
  }, [userInfo]);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    const data = {
      ...values,
      _id: userInfo._id
    }
    try {

      const avatarFile = avatarList[0]
      if (avatarFile && avatarFile.originFileObj) {
        const url = await callUploadSingleFile(avatarFile.originFileObj, "images/avatar");
        if (url.data) {
          data.avatar = url.data.fileUpload;
        } else {
          notification.error({
            message: avatarFile.name,
            description: url.message && Array.isArray(url.message) ?
              url.message.toString() :
              url.message,
            duration: 3
          })
        }
      } else if (avatarFile) {
        data.avatar = avatarFile.url;
      }

      const res = await callUpdateUser(data);
      if (res.data) {
        message.success("Cập nhập thành công")
      } else {
        notification.error({
          message: "Cập nhập thất bại",
          description: res.message && Array.isArray(res.message) ?
            res.message.toString() :
            res.message,
          duration: 3
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
      console.log(data);
    }
  }
  return <>
    <Form
      disabled={isLoading}
      layout="vertical"
      form={form}
      onFinish={onFinish}
    >
      <div className="row">
        <div className="col ">
          <Form.Item
            label='Avatar'
          >
            <Upload
              fileList={avatarList}
              listType="picture-circle"
              accept="image/*"
              multiple={false}
              onChange={handleChangeUpload(setAvatarList)}
              style={{
                width: "50%"
              }}
            >
              {avatarList.length > 0 ? null : <TbCamera size={20} />}
            </Upload>
          </Form.Item>
        </div>
        <div className="col text-end">
          <Button
            loading={isLoading}
            type="primary"
            icon={<TbEdit size={20} />}
            onClick={() => form.submit()}
          >
            Cập nhập
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6">
          <Form.Item
            name={"name"}
            label={"Họ tên"}
            rules={[{
              required: true,
              message: "Vui lòng không để trống"
            }]}
          >
            <Input placeholder="Họ tên" />
          </Form.Item>
        </div>
        <div className="col-6 col-lg-3">
          <Form.Item
            name={"age"}
            label={"Tuổi"}
          >
            <InputNumber placeholder="Tuổi" style={{ width: "100%" }} />
          </Form.Item>
        </div>
        <div className="col-6 col-lg-3">
          <Form.Item
            name={"gender"}
            label={"Giới tính"}
          >
            <Select options={[
              {
                label: "Nam",
                value: "male"
              },
              {
                label: "Nữ",
                value: "female"
              },
              {
                label: "Khác",
                value: "others"
              }
            ]} placeholder="giới tính" />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6">
          <Form.Item
            name={"email"}
            label={"Email"}
            rules={[{
              required: true,
              message: "Vui lòng không để trống"
            }]}
          >
            <Input disabled />
          </Form.Item>
        </div>
        <div className="col-12 col-lg-6">
          <Form.Item
            name={"phone"}
            label={"Số điện thoại"}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </div>
      </div>
    </Form>
  </>
}

export default PersonalInformation