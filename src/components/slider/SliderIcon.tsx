import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router";
import { Typography } from "antd";

interface IProps {
    data: any[]
}

const { Text } = Typography

const SliderIcon = (props: IProps) => {
    const { data } = props;
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
        ],
    };
    return (
        <>
            <div className="slider">
                <Slider {...settings}>
                    {data.map((item: any) => (
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
        </>
    )
}

export default SliderIcon