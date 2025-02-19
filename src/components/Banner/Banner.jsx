import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import slideImg1 from "../../assets/images/slides/slide1.webp";
import slideImg2 from "../../assets/images/slides/slide2.jpg";
import slideImg3 from "../../assets/images/slides/slide3.webp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import framer-motion
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
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

  // Framer Motion Variants
  const overlayVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.0, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5 } },
  };

  return (
    <div className="relative w-full mb-16">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[600px] md:h-[720px]"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              {/* Background Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-[600px] md:h-[720px] object-cover"
              />
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center text-white p-6"
                initial="hidden"
                animate="visible"
                variants={overlayVariants}
              >
                <motion.h2
                  className="text-3xl md:text-5xl font-bold mb-4 text-blue-400 dark:text-blue-500"
                  variants={overlayVariants}
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl mb-6 text-gray-200 dark:text-gray-300"
                  variants={overlayVariants}
                >
                  {slide.description}
                </motion.p>
                {/* Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    onClick={()=> navigate('/all-tasks')}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded transition"
                    variants={buttonVariants}
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    onClick={()=> navigate('/about-us')}
                    className="border-2 border-white hover:bg-white hover:text-gray-900 transition text-white py-2 px-6 rounded"
                    variants={buttonVariants}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 
        bg-white text-gray-800 dark:bg-gray-800 dark:text-white 
        p-3 rounded-full shadow-md hover:bg-blue-500 dark:hover:bg-blue-400
        transition z-10">
        <FaArrowLeft className="w-6 h-6" />
      </button>

      <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 
        bg-white text-gray-800 dark:bg-gray-800 dark:text-white 
        p-3 rounded-full shadow-md hover:bg-blue-500 dark:hover:bg-blue-400
        transition z-10">
        <FaArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Banner;
