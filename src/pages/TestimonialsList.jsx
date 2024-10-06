import React, { useState } from "react";
import Slider from "react-slick";
import Testimonials from "../components/Testimonials";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import yash from '../yash.jpeg';
import saurabh from '../saurabh.jpeg';
import parth from '../parth.jpeg';
import mangesh from '../mangesh.jpeg'
import krishna from '../krishna.jpeg'
import shubham from '../shubham.jpeg'
const testimonialData = [
  {
    image: yash,
    name: "Yash Kondawar",
    position: "Data Engineer",
    quote: "Yogesh has very in-depth knowledge of stock market concepts and has the skill and patience to guide others in their journey. He is good at managing personal finances and has helped a lot of people, me included.",
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
    image: mangesh,
    name: "Mangesh Gandhewar",
    position: "Software Engineer",
    quote: "Yogesh has an exceptional ability to break down complicated financial strategies into simple, actionable steps. His guidance has been instrumental in helping me navigate through challenging investment decisions with confidence and clarity",
    company: "CGI",
  },
  {
    image: krishna,
    name: "Krishna Bhattad",
    position: "Sr.Software Enginner",
    quote: "With Yogesh's deep understanding of market trends and his strategic investment advice, I’ve been able to grow my portfolio steadily. His patience and commitment to his clients make him an outstanding mentor.",
    company: "Vayana Netwoks",
  },
  {
    image: shubham,
    name: "Shubham Mahajan",
    position: "Software Engineer",
    quote: "Yogesh's expertise in stock analysis and market predictions has been invaluable to my financial growth.",
    company: "capgemini",
  },
];

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-blue-600 rounded-full text-blue-600 custom-arrow`}
      style={{ ...style, display: "block", right: "-20px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-blue-600 rounded-full text-blue-600 custom-arrow`}
      style={{ ...style, display: "block", left: "-20px", zIndex: 1 }}
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
    autoplaySpeed: 2500,
    centerMode: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
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
    <div className="flex flex-col items-center justify-center bg-white py-20">
      <h1 className="text-center text-gray-900 text-4xl font-bold mb-12">
        What Our Clients Say
      </h1>
      <div className="w-full max-w-6xl">
        <Slider {...settings}>
          {testimonialData.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div
                className={`transform transition-transform duration-500 ease-in-out ${
                  index === currentSlide
                    ? "scale-90" // Scale up the active slide
                    : "scale-90 opacity-75" // Scale down inactive slides
                }`}
              >
                <div className="bg-white rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <Testimonials testimonial={testimonial} />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialList;
