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
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


const HomePage = () => {
  const [slideCategory, setSlideCategory] = useState<ICategories[]>([]);
  const [bestSellers, setBestSellers] = useState<IProducts[]>([]);

  const categories = useAppSelector(state => state.generalSettings.categories);

  useEffect(() => {
    getBestSeller()
  }, []);

  useEffect(() => {
    if (categories) {
      const displayMode = categories.filter(item => item.displayMode);
      setSlideCategory(displayMode);
    }
  }, [categories])

  const getBestSeller = async () => {
    try {
      const res = await callGetProducts("sort=-sold&pageSize=4");
      if (res.data) {
        setBestSellers(res.data.result);
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
            title="Our BestSeller"
            level={2}
          />
          <div className="row justify-content-center">
            {bestSellers.map(item => <ProductItem key={item._id} item={item} />)}
          </div>
        </Section>
      </div>
    </>
  )
}

export default HomePage