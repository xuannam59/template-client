import { Form, Input, Modal, notification, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DiscussList from "./DiscussList";
import { callCreateDiscuss, callGetDiscuss } from "@/apis/api";
import { IDiscuss } from "@/types/backend";
interface IProps {
  productId: string,
}


const { Title, Paragraph } = Typography;
const ProductDiscuss = (props: IProps) => {
  const { productId } = props
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataDiscuss, setDataDiscuss] = useState<IDiscuss[]>([]);
  const [isPageSize, setIsPageSize] = useState(true);

  const [form] = Form.useForm();

  useEffect(() => {
    getDiscuss()
  }, []);

  const getDiscuss = async () => {
    try {
      const res = await callGetDiscuss(
        `parent_id=${productId}${isPageSize ? "&pageSize=5" : ''}`
      );
      if (res.data) {
        setDataDiscuss(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (value: any) => {
    try {
      const res = await callCreateDiscuss(value, productId);
      if (res.data) {
        form.resetFields();
      } else {
        notification.error({
          message: "Trả lời thất bại",
          description: res.message
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(12312);
  return (<>
    <div className="mx-3 container">
      <DiscussList parentId={productId} />
    </div>
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item>
          <Input allowClear />
        </Form.Item>
      </Form>

    </div>
    <Modal
      width={350}
      open={isModalOpen}
      onOk={() => navigate("/login")}
      onCancel={() => setIsModalOpen(false)}
      okText={"Login"}
    >
      <Title level={4} className="text-center">Jmember</Title>
      <Paragraph className="text-center fw-bold fs-6 text-muted">
        Vui lòng đăng nhập tài khoản Jmember để thảo luận.
      </Paragraph>
    </Modal>
  </>
  )
}

export default ProductDiscuss