import { callGetOrder } from "@/apis/api";
import { useAppSelector } from "@/redux/hook";
import { IOrder } from "@/types/backend";
import { VND } from "@/utils/handleCurrency";
import { Avatar, List, Typography, Card, Tag, Space, Button, notification } from "antd";
import { useEffect, useState } from "react";
import ReviewModal from "./ReviewModal";
import { TbMessageStar } from "react-icons/tb";

interface IProp {
  status: number;
}

const { Text, Paragraph, Title } = Typography;

const statusMap: Record<number, string> = {
  0: "Chờ xác nhận",
  1: "Chờ giao hàng",
  2: "Đã giao",
  3: "Trả hàng",
  4: "Đã huỷ",
};

const paymentMethodMap: Record<string, string> = {
  "cod": "Thanh toán khi nhận hàng",
  "tt": "Thanh toán bằng ngân hàng",
};

const statusColor: Record<string, string> = {
  0: "#6FC7E1",
  1: "#6FC7E1",
  2: "#C0EB6A",
  3: "#FCD783",
  4: "#F9476C",
}

const ListOrder = ({ status }: IProp) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(0);
  const [productReview, setProductReview] = useState<IOrder["products"][number]>();
  const [orderSelected, setOrderSelected] = useState("");

  const userId = useAppSelector(state => state.auth.user._id);

  useEffect(() => {
    getOrders();
  }, [current]);

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const res = await callGetOrder(current, pageSize, userId, status);
      if (res.data) {
        setOrders(res.data.result);
        setTotalItems(res.data.meta.totalItems);
      } else {
        notification.error({
          message: "Lấy thông tin đơn hàng lỗi",
          description: res.message
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (<>


    <List
      loading={isLoading}
      dataSource={orders}
      pagination={{
        current: current,
        pageSize: pageSize,
        total: totalItems,
        onChange: (page) => setCurrent(page),
      }}
      renderItem={(order) => (
        <Card style={{ marginBottom: 16 }}>
          <List.Item>
            <List.Item.Meta
              title={<Text strong>Mã đơn hàng: {order._id}</Text>}
              description={
                <Space direction="vertical">
                  <Text>
                    Số lượng sản phẩm: <strong>{order.products.length}</strong>
                  </Text>
                  <Text>Trạng thái: <Tag
                    color={statusColor[order.status]}>
                    {statusMap[order.status]}
                  </Tag>
                  </Text>
                  <Text>Hình thức thanh toán: <Tag
                    color={order.paymentMethod === "cod" ? "green" : "blue"}>
                    {paymentMethodMap[order.paymentMethod]}
                  </Tag></Text>
                </Space>
              }
            />
          </List.Item>
          <div style={{ maxHeight: `${order.status === 2 ? "300px" : "210px"}`, overflowY: "auto" }}>
            <List
              dataSource={order.products}
              renderItem={(product) => (
                <List.Item
                  className="mx-3">
                  <List.Item.Meta
                    avatar={<Avatar src={product.thumbnail} shape="square" size={60} />}
                    title={<Paragraph className="mb-0" ellipsis={{ rows: 1, tooltip: product.title }}>
                      {product.title}
                    </Paragraph>}
                    description={
                      <>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <Text className="d-flex align-items-center" type="secondary">
                              Màu sắc: <Tag
                                color={product.color}
                                style={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: "100%",
                                  marginLeft: 3,
                                  border: "1px solid #ccc"
                                }} />
                            </Text>
                            <Text>x {product.quantity}</Text>
                          </div>
                          <Text>{VND.format(product.price)}</Text>
                        </div>
                        <div className="text-end mt-2">
                          {order.status === 2 &&
                            <Button
                              type="primary"
                              disabled={product.review}
                              onClick={() => {
                                setIsVisible(true)
                                setProductReview(product)
                                setOrderSelected(order._id)
                              }}
                              icon={<TbMessageStar size={20} />}
                            >
                              {product.review && "Đã "}Đánh giá</Button>
                          }
                        </div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </div>

          <Title className="text-end mt-3" level={4}>Tổng: {VND.format(order.totalAmount)}</Title>
        </Card>
      )}
    />

    <ReviewModal
      orderId={orderSelected}
      isVisible={isVisible}
      product={productReview}
      onClose={() => {
        setIsVisible(false);
      }}
      getOrders={getOrders}
    />
  </>
  );
};

export default ListOrder;
