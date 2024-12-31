import { callLogOut } from '@/apis/api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { doLogOutAction } from '@/redux/reducers/auth.reducer';
import { Avatar, Badge, Button, Drawer, Dropdown, Layout, Menu, MenuProps, Space, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react';
import { TbBell, TbChecklist, TbLogout, TbMenu2, TbSearch, TbShoppingCart, TbUser } from 'react-icons/tb';
import { Link, useLocation } from 'react-router';
import HeaderInputSearch from './HeaderInputSearch';

type MenuItem = Required<MenuProps>['items'][number];
const { Text } = Typography
const { Header } = Layout;

const HeaderPage = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

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
          <div className="col fs-3 d-none d-lg-block">
            <strong style={{ color: "#00a854" }}>J</strong>un<strong style={{ color: "#6252cd" }}>K</strong>un
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
          <div className="col d-none d-md-block">
            <HeaderInputSearch />
          </div>

          <div className="col text-end">
            <Space size={"large"}>
              <div className="d-block d-md-none ">
                <TbSearch size={25} style={{ cursor: "pointer" }} /> {/*Update*/}
              </div>
              <Badge count={2} showZero>
                <TbShoppingCart size={25} style={{ cursor: "pointer" }} />
              </Badge>
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