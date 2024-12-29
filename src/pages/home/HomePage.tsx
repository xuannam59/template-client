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
      const res = await callGetCategories();
      if (res.data) {
        const category = res.data.result.filter(item => item.parentId);
        setCategories(category);
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
      <div className="container">
        <Section>
          <Tabbar title="" level={2} />
          <div style={{
            width: "80%",
            margin: " 0 auto",
            textAlign: "center",
          }}>
            <Slider {...settings}>
              {categories.map((item: ICategories) => (
                <div
                  className="item-slider"
                  key={item._id}
                >
                  <Link to={`/products/${item.slug}`}>
                    <img src={item.image} alt={item.title} />
                    <Text style={{ marginTop: "20px" }}>{item.title}</Text>
                  </Link>
                </div>

              ))}
            </Slider>
          </div>
        </Section>

        <Section>
          <Tabbar title="Mac Book" level={2} />
          <div style={{
            width: "80%",
            margin: " 0 auto",
            textAlign: "center",
          }}>
          </div>
        </Section>
      </div>
    </>
  )
}

export default HomePage