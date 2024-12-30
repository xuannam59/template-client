import { Carousel, Typography } from "antd"
import { imgSlider } from "./dataInfo";
import { useEffect, useState } from "react";
import { callGetCategories } from "@/apis/api";
import { ICategories } from "@/types/backend";
import Tabbar from "@/components/home/Tabbar";
import Section from "@/components/home/Section";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router";
import SliderIcon from "@/components/slider/SliderIcon";

const { Text } = Typography

const HomePage = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  useEffect(() => {
    getCategories()
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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
          <Tabbar title="Mac Book" level={2} />

        </Section>
      </div>
    </>
  )
}

export default HomePage