import { Swiper, SwiperSlide } from "swiper/react";
import slideImg1 from "../../assets/images/slides/slide1.webp";
import slideImg2 from "../../assets/images/slides/slide2.jpg";
import slideImg3 from "../../assets/images/slides/slide3.webp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";


const Banner = () => {
  const sliderData = [
    {
      img: slideImg1,
      title: "Earn Money with Micro Jobs",
      description: "Complete small tasks online and get paid instantly!",
    },
    {
      img: slideImg2,
      title: "Secure Payments Guarantee",
      description:
        "We ensure timely and secure payments for all completed tasks.",
    },
    {
      img: slideImg3,
      title: "Join a Global Network",
      description:
        "Collaborate with task owners and workers from around the world.",
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper h-[720px]"
    >
       {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              {/* Background Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-[720px] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-6">{slide.description}</p>
                {/* Buttons */}
                <div className="flex gap-4">
                  <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-6 rounded">
                    Get Started
                  </button>
                  <button className="bg-transparent border-2 hover:bg-black hover:border-black transition text-white py-2 px-6 rounded ">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Banner;
