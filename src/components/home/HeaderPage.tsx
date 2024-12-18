import { callLogOut } from '@/apis/api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { doLogOutAction } from '@/redux/reducers/auth.reducer';
import { Avatar, Badge, Button, Dropdown, Layout, Menu, MenuProps, Space, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react';
import { TbChecklist, TbLogout, TbShoppingCart, TbUser } from 'react-icons/tb';
import { Link, useLocation } from 'react-router';
import HeaderInputSearch from './HeaderInputSearch';

type MenuItem = Required<MenuProps>['items'][number];
const { Text } = Typography
const { Header } = Layout;

const HeaderPage = () => {
  const [activeMenu, setActiveMenu] = useState('');
  let location = useLocation();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

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
        if (res.data) {
          dispatch(doLogOutAction());
        }
      }
    },
  ]
  return (
    <Header style={{ backgroundColor: "white" }}>
      <div className="row">
        <div className="col-3 fs-3">
          <strong style={{ color: "#00a854" }}>J</strong>un<strong style={{ color: "#6252cd" }}>K</strong>un
        </div>
        <div className="col-3">
          <Menu
            defaultSelectedKeys={['']}
            mode='horizontal'
            items={items}
            selectedKeys={[activeMenu]}
            theme="light"
            onClick={(e) => setActiveMenu(e.key)}
          />
        </div>
        <div className="col-4">
          <HeaderInputSearch />
        </div>
        <div className="col-2 text-end">
          <Space size={"large"}>
            <Badge count={2}>
              <TbShoppingCart size={22} style={{ cursor: "pointer" }} />
            </Badge>
            {isAuthenticated ?
              <>
                <Dropdown menu={{ items: itemsDropDown, style: { minWidth: "150px" } }}>
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
  )
}

export default HeaderPage