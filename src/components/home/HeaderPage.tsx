import { Layout, Menu, MenuProps } from 'antd'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];

const { Header } = Layout;
const HeaderPage = () => {
  const [activeMenu, setActiveMenu] = useState('');
  let location = useLocation();
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

  return (
    <Header style={{ backgroundColor: "white" }}>
      <div className="row">
        <div className="col fs-3">
          <strong style={{ color: "#00a854" }}>J</strong>un<strong style={{ color: "#6252cd" }}>K</strong>un
        </div>
        <div className="col">
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
          info
        </div>
      </div>
    </Header>
  )
}

export default HeaderPage