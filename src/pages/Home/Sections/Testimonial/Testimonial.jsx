import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://i.ibb.co/j4mh1h2/1.jpg",
    feedback:
      "This platform is a game-changer! I’ve been able to earn extra money in my free time.",
    rating: 5,
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: "https://i.ibb.co/QCMhNW8/2.jpg",
    feedback:
      "I love how simple and user-friendly the platform is. Completing tasks has never been this.",
    rating: 4.5,
    location: "London, UK",
  },
  {
    id: 3,
    name: "Aisha Khan",
    photo: "https://i.ibb.co/N9kyxnH/3.jpg",
    feedback:
      "The best platform for micro-tasks! It’s helped me save up for my goals while working from home.",
    rating: 5,
    location: "Lahore, Pakistan",
  },
  {
    id: 4,
    name: "Carlos Ramirez",
    photo: "https://i.ibb.co/XbLkkYp/4.jpg",
    feedback:
      "I’ve tried other platforms, but this one stands out. Great tasks and excellent support!",
    rating: 4.8,
    location: "Madrid, Spain",
  },
  {
    id: 5,
    name: "Sophia Lee",
    photo: "https://i.ibb.co/mB0QrbS/5.jpg",
    feedback:
      "The variety of tasks keeps things interesting, and I’ve already earned more than I expected.",
    rating: 4.7,
    location: "Seoul, South Korea",
  },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <>
      {Array.from({ length: fullStars }).map((_, index) => (
        <motion.span
          key={`full-${index}`}
          className="text-yellow-500 text-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <FaStar />
        </motion.span>
      ))}
      {hasHalfStar && (
        <span className="text-yellow-500 text-lg" title="Half star">
          <FaStar />
        </span>
      )}
    </>
  );
};

const Testimonial = () => {
  return (
    <section className="my-12">
      <SectionTitle
        title="Testimonials That Inspire"
        subtitle="Your Path to Success Starts Here"
      />

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full max-w-7xl mx-auto"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <motion.div
              className="flex flex-col items-center text-center p-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-800 shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.img
                src={testimonial.photo}
                alt={`Photo of ${testimonial.name}`}
                className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500 object-cover hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{testimonial.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">{testimonial.location}</p>
              <p className="mt-2 text-gray-600 dark:text-gray-100 text-sm italic">
                &ldquo;{testimonial.feedback}&rdquo;
              </p>
              <div className="mt-4 flex justify-center gap-1 ">
                {renderStars(testimonial.rating)}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
