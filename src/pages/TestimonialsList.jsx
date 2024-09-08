import React, { useState } from "react";
import Slider from "react-slick";
import Testimonials from "../components/Testimonials";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import yash from '../yash.jpeg'
import saurabh from '../saurabh.jpeg'
import parth from '../parth.jpeg'

const testimonialData = [
  {
    image: yash,
    name: "Yash Kondawar",
    position: "Data Engineer",
    quote: "Yogesh has very in-depth knowledge of stock market concepts and has the skill and patience to guide others in their journey. He is good at managing personal finances and has helped a lot of people, me included. ",
    company: "Microsoft",
  },
  {
    image: parth,
    name: "Parth Bhattad",
    position: "Software Developer",
    quote: "Yogesh has an exceptional understanding of stock market principles and a talent for simplifying complex concepts. His patience and expertise have been invaluable in guiding me and many others through the intricacies of investing.",
    company: "Newtons Apple",
  },
  {
    image: saurabh,
    name: "Saurabh Penshanwar",
    position: "Software Developer",
    quote: "Yogesh has demonstrated exceptional expertise and insight in the share market. His analytical skills and deep understanding of market trends have consistently led to well-informed investment decisions and impressive portfolio performance.",
    company: "Globant",
  },
  {
    image: parth,
    name: "Parth Bhattad",
    position: "Software Developer",
    quote: "Yogesh has an exceptional understanding of stock market principles and a talent for simplifying complex concepts. His patience and expertise have been invaluable in guiding me and many others through the intricacies of investing.",
    company: "Newtons Apple",
  },

];

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-blue-700 text-blue-700  custom-arrow`}
      style={{ ...style, display: "block", right: "-25px" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-blue-700 text-blue-700 custom-arrow`}
      style={{ ...style, display: "block", left: "-25px" }}
      onClick={onClick}
    />
  );
};

const TestimonialList = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    arrows: true,
    nextArrow: <SampleNextArrow  />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="items-center justify-center">
      <h1 className="text-center text-gray-900 text-4xl font-bold mt-20 mb-10">What Our Clients Say</h1>
      <div className="bg-white flex items-center justify-center py-20">
        <div className="max-w-5xl w-full">
          <Slider {...settings}>
            {testimonialData.map((testimonial, index) => (
              <div key={index} className="p-4">
                <div
                  className={`transform transition-transform duration-500 ease-in-out ${
                    index === currentSlide
                      ? "scale-100"
                      : "scale-75 blur-sm"
                  }`}
                >
                  <Testimonials testimonial={testimonial} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TestimonialList;
