// Import Swiper and its required modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

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
      "I love how simple and user-friendly the platform is. Completing tasks has never been this rewarding.",
    rating: 4.5,
    location: "London, UK",
  },
  {
    id: 3,
    name: "Aisha Khan",
    photo: "https://i.ibb.co.com/N9kyxnH/3.jpg",
    feedback:
      "The best platform for micro-tasks! It’s helped me save up for my goals while working from home.",
    rating: 5,
    location: "Lahore, Pakistan",
  },
  {
    id: 4,
    name: "Carlos Ramirez",
    photo: "https://i.ibb.co.com/XbLkkYp/4.jpg",
    feedback:
      "I’ve tried other platforms, but this one stands out. Great tasks and excellent support!",
    rating: 4.8,
    location: "Madrid, Spain",
  },
  {
    id: 5,
    name: "Sophia Lee",
    photo: "https://i.ibb.co.com/mB0QrbS/5.jpg",
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
        <span key={`full-${index}`} className="text-yellow-500 text-lg">
          
          <FaStar />
        </span>
      ))}
      {hasHalfStar && (
        <span className="text-yellow-500 text-lg" title="Half star">
          
          <FaStar />
        </span>
      )}
    </>
  );
};

// Main Component
const Testimonial = () => {
  return (
    <section className="my-12">
      {/* Section Title */}
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
        className="w-full max-w-6xl mx-auto"
        breakpoints={{
          // Responsiveness
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
             
              <img
                src={testimonial.photo}
                alt={`Photo of ${testimonial.name}`}
                className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500 object-cover"
              />

              
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.location}</p>

              
              <p className="mt-4 text-gray-700 text-sm italic">
                &ldquo;{testimonial.feedback}&rdquo;
              </p>

              
              <div className="mt-4 flex justify-center">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
