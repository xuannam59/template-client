import { callGetProducts } from "@/apis/api";
import Section from "@/components/home/Section";
import Tabbar from "@/components/home/Tabbar";
import ProductItem from "@/components/product/ProductItem";
import SliderIcon from "@/components/slider/SliderIcon";
import { imgSlider } from "@/constants/appInfos";
import { useAppSelector } from "@/redux/hook";
import { ICategories, IProducts } from "@/types/backend";
import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { TbDeviceLaptop } from "react-icons/tb";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


const HomePage = () => {
  const [slideCategory, setSlideCategory] = useState<ICategories[]>([]);
  const [bestSellers, setBestSellers] = useState<IProducts[]>([]);
  const [macBookAriCategory, setMacBookAriCategory] = useState<IProducts[]>([]);
  const [products, setProducts] = useState<{
    bestSellers: IProducts[];
    macBookAri: IProducts[];
    macBookPro: IProducts[];
    iMacAndMacDesktop: IProducts[];
    tool: IProducts[];
  }>({
    bestSellers: [],
    macBookAri: [],
    macBookPro: [],
    iMacAndMacDesktop: [],
    tool: [],
  });

  const categories = useAppSelector(state => state.generalSettings.categories);

  useEffect(() => {
    getProducts()
  }, []);

  useEffect(() => {
    if (categories) {
      const displayMode = categories.filter(item => item.displayMode);
      setSlideCategory(displayMode);
    }
  }, [categories])

  const getProducts = async () => {
    try {
      const res = await callGetProducts("sort=-createdAt");
      if (res.data) {
        const products = res.data.result;
        const data = {
          bestSellers: products.sort((a, b) => b.sold - a.sold).slice(0, 4),
          macBookAri: products.filter(item => /MacBook Air/i.test(item.categoryId.title)).slice(0, 4),
          macBookPro: products.filter(item => /MacBook Pro/i.test(item.categoryId.title)).slice(0, 4),
          iMacAndMacDesktop: products.filter(item =>
            ([/imac/i, /mac mini/i, /mac tudio/i, /mac pro/i].some(regex => regex.test(item.categoryId.title))))
            .slice(0, 4),
          tool: products.filter(item => /phu kien/i.test(item.categoryId.title)).slice(0, 4),
        }
        setProducts(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(products)

  return (
    <>
      <Carousel
        style={{
          maxHeight: "500px",
          height: "auto",
        }}
        autoplay
      >  {
          imgSlider.map((item: string) => <div key={item}>
            <img
              src={item}
              alt=""
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                maxHeight: "500px"
              }}
            />
          </div>
          )
        }
      </Carousel>
      <div
        style={{
          background: "#222222",
          padding: "15px",
        }}>
        <div className="container d-flex justify-content-center text-center">
          <h1
            className="m-0 lh-base responsive-font fw-bold text-white"
          >
            JunKun là đại lý uỷ quyền chính thức của Apple tại Việt Nam (AAR)
          </h1>
        </div>
      </div>
      <div className="container">
        <Section>
          <SliderIcon data={slideCategory} />
        </Section>
        <Section>
          <Tabbar
            title="BestSellers"
            align="center"
            level={2}
          />
          <div className="row justify-content-center">
            {products.bestSellers.map(item => <ProductItem key={item._id} item={item} />)}
          </div>
        </Section>
        {products.macBookAri.length > 0 &&
          <Section>
            <Tabbar
              title="MacBook Ari"
              level={2}
              icon={<TbDeviceLaptop size={40} />}
              align="center"
            />
            <div className="row justify-content-center">
              {products.macBookAri.map(item => <ProductItem key={item._id} item={item} />)}
            </div>
          </Section>
        }
        {products.macBookPro.length > 0 &&
          <Section>
            <Tabbar
              title="MacBook Pro"
              level={2}
              icon={<TbDeviceLaptop size={40} />}
              align="center"
            />
            <div className="row justify-content-center">
              {products.macBookPro.map(item => <ProductItem key={item._id} item={item} />)}
            </div>
          </Section>
        }
        {products.iMacAndMacDesktop.length > 0 &&
          <Section>
            <Tabbar
              title="iMac & Mac Desktop"
              level={2}
              icon={<TbDeviceLaptop size={40} />}
              align="center"
            />
            <div className="row justify-content-center">
              {products.iMacAndMacDesktop.map(item => <ProductItem key={item._id} item={item} />)}
            </div>
          </Section>
        }
        {
          products.tool.length > 0 &&
          <Section>
            <Tabbar
              title="Phụ kiện"
              level={2}
              icon={<TbDeviceLaptop size={40} />}
              align="center"
            />
            <div className="row justify-content-center">
              {products.tool.map(item => <ProductItem key={item._id} item={item} />)}
            </div>
          </Section>
        }
      </div>
    </>
  )
}

export default HomePage