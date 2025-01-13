import { callLogOut, callRemoveProductToCart } from '@/apis/api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { doLogOutAction } from '@/redux/reducers/auth.reducer';
import { Avatar, Badge, Button, Card, Divider, Drawer, Dropdown, Layout, List, Menu, MenuProps, message, Modal, notification, Space, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react';
import { TbBell, TbChecklist, TbLogout, TbMenu2, TbSearch, TbShoppingCart, TbTrash, TbUser } from 'react-icons/tb';
import { Link, useLocation } from 'react-router';
import HeaderInputSearch from './HeaderInputSearch';
import { VND } from '@/utils/handleCurrency';
import { doGetCart } from '@/redux/reducers/cart.reducer';

type MenuItem = Required<MenuProps>['items'][number];
const { Text, Title, Paragraph } = Typography
const { Header } = Layout;

const HeaderPage = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const dispatch = useAppDispatch();

  let location = useLocation();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);
  const cartUser = useAppSelector(state => state.cart);
  const totalAmount = cartUser.productList.reduce((a, b) =>
    a + b.quantity * b.productId.price * (1 - b.productId.discountPercentage / 100)
    , 0);

  useEffect(() => {
    if (location && location.pathname) {
      const allRoute = ["", "products"];
      const currentRoute = allRoute.find((item) => location.pathname.split("/")[1] === item);
      if (currentRoute) {
        setActiveMenu(currentRoute);
      } else {
        setActiveMenu("home");
      }
    }
  }, [location]);

  const items: MenuItem[] = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: 'home',
    },
    {
      label: <Link to={"/products"}>Products</Link>,
      key: 'products',
    },
    {
      label: <Link to={"/"}>Pages</Link>,
      key: 'pages',
    },
    {
      label: <Link to={"/"}>Contact</Link>,
      key: 'contact',
    }
  ];

  const itemsDropDown: MenuProps['items'] = [
    {
      label: <Link to={"/user/account"}>My Account</Link>,
      key: 'myAccount',
      icon: <TbUser size={20} />
    },
    {
      label: <Link to={"/user/order"}>Order</Link>,
      key: 'Order',
      icon: <TbChecklist size={20} />
    },
    {
      label: 'Logout',
      key: 'Logout',
      icon: <TbLogout size={20} />,
      onClick: async () => {
        const res = await callLogOut();
        window.location.reload();
        if (res.data) {
          dispatch(doLogOutAction());
        }
      }
    },
  ];

  const handleRemoveCartItem = async (data: { id: string, color: string }) => {
    try {
      const res = await callRemoveProductToCart(data.id, data.color);
      if (res.data) {
        dispatch(doGetCart(res.data));
        message.success("xoá thành công sản phẩm khỏi giỏ hàng");
      } else {
        notification.error({
          message: "Error delete",
          description: res.message
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Header style={{
        backgroundColor: "white",
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
      }}>
        <div className="row">
          <div className="col col-md-2 col-sm-2 d-block d-lg-none">
            <TbMenu2
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => setIsVisibleDrawer(true)}
            />
          </div> {/*Update*/}
          <div className="col fs-3 text-sm-center text-lg-start">
            <Link to={"/"} style={{ color: "black" }}>
              <strong style={{ color: "#00a854" }}>J</strong>un<strong style={{ color: "#6252cd" }}>K</strong>un
            </Link>
          </div>
          <div className="col d-none d-lg-block">
            <Menu
              defaultSelectedKeys={['']}
              mode='horizontal'
              items={items}
              selectedKeys={[activeMenu]}
              theme="light"
              onClick={(e) => setActiveMenu(e.key)}
            />
          </div>

          <div className="col text-end">
            <Space size={"middle"}>
              <TbSearch size={25} style={{ cursor: "pointer" }} onClick={() => setIsOpenSearch(true)} />
              <Dropdown
                trigger={["click"]}
                placement={"bottom"}
                dropdownRender={() => (
                  <>
                    <Card className='shadow' style={{ minWidth: 410 }}>
                      <Paragraph>Có {cartUser.productList.length} sản phẩm trong giỏ hàng </Paragraph>
                      <Divider className='m-0' />
                      <div style={{ maxHeight: "378px", overflowY: "auto" }}>
                        <List
                          dataSource={cartUser.productList}
                          renderItem={(item) =>
                            <List.Item
                              key={item.productId._id}
                              extra={
                                <Button
                                  icon={<TbTrash size={22} />}
                                  onClick={() => Modal.confirm({
                                    title: "Xác nhận",
                                    content: "Bạn chắc chắn muốn xoá sản phẩm này",
                                    onOk: async () => {
                                      await handleRemoveCartItem({ id: item.productId._id, color: item.color });
                                      console.log(item._id);
                                    }
                                  })}
                                  danger
                                  type='text' />
                              }>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    src={item.productId.images[0]}
                                    size={52}
                                    shape='square'
                                  />}
                                title={<>
                                  <Link to={`/products/detail/${item.productId.slug}`}>
                                    <Text ellipsis className='fw-light'> {item.productId.title} </Text>
                                    <Paragraph className='m-0'>
                                      {item.quantity} x
                                      {VND.format(item.productId.price * (1 - item.productId.discountPercentage / 100))}
                                    </Paragraph>
                                  </Link>
                                </>}
                                description={<div className='d-flex align-items-center'>
                                  Màu sắc: <Tag
                                    className='border'
                                    color={item.color}
                                    style={{ height: "16px", borderRadius: "100%", margin: "0 8px" }}
                                  />
                                </div>}
                              />
                            </List.Item>} />
                      </div>
                      <Divider className='m-0 mb-2' />
                      <Title level={4}>
                        Tổng tiền: {VND.format(totalAmount)}
                      </Title>

                      <div className="mt-4">
                        <Button
                          type='primary'
                          ghost
                          size='large'
                          style={{ width: "100%" }}
                        > Xem giỏ hàng</Button>
                        <Button
                          className='mt-2'
                          type='primary'
                          size='large'
                          style={{ width: "100%" }}
                        > Thanh toán</Button>
                      </div>
                    </Card>
                  </>
                )}
              >
                <Badge count={cartUser.productList.length} showZero>
                  <TbShoppingCart size={25} style={{ cursor: "pointer" }} />
                </Badge>
              </Dropdown>
              {isAuthenticated ?
                <>
                  <Badge count={0} showZero>
                    <TbBell size={25} style={{ cursor: "pointer" }} />
                  </Badge>
                  <Dropdown menu={{ items: itemsDropDown, style: { minWidth: "150px" } }} arrow placement="bottomRight" >
                    <Space style={{ cursor: "pointer" }}>
                      <Avatar
                        src={user.avatar ? user.avatar : "/images/avatar-user.png"}
                        size={"large"}
                      />
                      <div className="d-flex flex-column align-items-center">
                        <Text style={{ maxWidth: "125px" }} ellipsis>
                          {user.name}
                        </Text>
                        {user.role.name === "ADMIN" &&
                          <Tag color="purple">{user.role.name}</Tag>
                        }
                      </div>
                    </Space>
                  </Dropdown>
                </>
                :
                <Space>
                  <Button type="primary"><Link to={"/login"}> Login</Link></Button>
                  <Button type="default"><Link to={"/sign-up"}> Sig-up</Link></Button>
                </Space>
              }
            </Space>
          </div>
        </div>
      </Header>
      <HeaderInputSearch
        openDrawer={isOpenSearch}
        onClose={() => { setIsOpenSearch(false) }}
      />
      <Drawer
        open={isVisibleDrawer}
        onClose={() => setIsVisibleDrawer(false)}
        placement="left"
        closable={false}
      >
        Hello
      </Drawer>
    </>
  )
}

export default HeaderPage