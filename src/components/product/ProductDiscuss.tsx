import { callCreateDiscuss } from "@/apis/api";
import { useAppSelector } from "@/redux/hook";
import { IDiscuss } from "@/types/backend";
import { Button, Divider, Input, Modal, notification, Typography } from "antd";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import DiscussList from "./DiscussList";
interface IProps {
  productId: string,
}


const { Title, Paragraph } = Typography;
const ProductDiscuss = (props: IProps) => {
  const { productId } = props
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataDiscuss, setDataDiscuss] = useState<IDiscuss>();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(5);

  // Thêm useRef để tham chiếu đến Input.TextArea
  const inputRef = useRef<any>(null);

  const auth = useAppSelector(state => state.auth);


  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await callCreateDiscuss(comment, productId);
      if (res.data) {
        setComment('');
        const data: IDiscuss = {
          _id: res.data._id,
          comment: comment,
          parent_id: productId,
          created_by: {
            _id: auth.user._id,
            name: auth.user.name,
            avatar: auth.user.avatar
          },
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        setDataDiscuss(data)
      } else {
        notification.error({
          message: "Trả lời thất bại",
          description: res.message
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }



  return (<>
    <div className="mx-3 container">
      <DiscussList parentId={productId} data={dataDiscuss} limit={limit} />
      <div className="mt-4">
        <Button
          onClick={() => {
            setLimit(limit + 5)
          }}
          type="link"
          size="small"
        >
          Hiển thị thêm
        </Button>
      </div>
    </div>
    <Divider className="" />
    <Title level={4}>Bình luận: </Title>

    <div className='row'>
      <div className='col-sm-12 col-md-8 col-lg-6'>
        <div className=''>
          <Input.TextArea
            disabled={isLoading}
            value={comment}
            ref={inputRef}
            onFocus={() => {
              if (!auth.isAuthenticated) {
                setIsModalOpen(true);
                inputRef.current?.blur();
              }
            }}
            onChange={(val) => setComment(val.target.value)}
            allowClear
            rows={3}
          />
        </div>
        <div className='mt-3 text-right'>
          <Button
            loading={isLoading}
            disabled={!auth.isAuthenticated || !comment || isLoading}
            type='primary'
            size='large'
            onClick={handleSubmit}>
            Gửi
          </Button>
        </div>
      </div>
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