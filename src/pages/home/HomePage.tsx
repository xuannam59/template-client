import { Carousel } from "antd"
import { imgSlider } from "./dataInfo";
import { useEffect, useState } from "react";
import { callGetCategories, callGetProducts } from "@/apis/api";
import { ICategories, IProducts } from "@/types/backend";
import Tabbar from "@/components/home/Tabbar";
import Section from "@/components/home/Section";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderIcon from "@/components/slider/SliderIcon";
import ProductItem from "@/components/product/ProductItem";
// import { TbDeviceLaptop } from "react-icons/tb";


const HomePage = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [bestSellers, setBestSellers] = useState<IProducts[]>([]);
  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    getBestSeller();
    getCategories();
  }

  const getBestSeller = async () => {
    try {
      const res = await callGetProducts("sort=-sales&pageSize=4");
      if (res.data) {
        setBestSellers(res.data.result);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCategories = async () => {
    try {
      const res = await callGetCategories("displayMode=true");
      if (res.data) {
        setCategories(res.data.result);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Carousel
        style={{
          maxHeight: "500px",
          height: "auto",
        }}
        autoplay
      >  {
          imgSlider.map((item: string, index: number) => {
            return <>
              <div key={index}>
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
            </>
          })
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
          <SliderIcon data={categories} />
        </Section>
        <Section>
          <Tabbar
            title="Our BestSeller"
            level={2}
          />
          <div className="row">
            {bestSellers.map(item => <ProductItem key={item._id} item={item} />)}
          </div>
        </Section>
      </div>
    </>
  )
}

export default HomePage