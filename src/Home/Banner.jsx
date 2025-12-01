import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router";
import banner02 from '../assets/Banner-02.jpg'
import banner03 from '../assets/Banner-03.jpg'
import banner05 from '../assets/Banner-05.jpg'
import banner06 from '../assets/Banner-06.jpg'
import banner07 from '../assets/Banner-07.jpg'
import banner08 from '../assets/Banner-08.jpg'

const Banner = () => {
  const images = [
    banner02,
    banner03,
    banner05,
    banner06,
    banner07,
    banner08,
  ];

  return (
    <section className="relative w-full h-[70vh] rounded-xl overflow-hidden mb-10">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center bg-black/50 px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl"
        >
          Share a Plate, Spread a Smile
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl font-semibold text-white/90 max-w-2xl mb-6"
        >
          PlateShare connects people who have surplus food with those who need it most
        </motion.p>

        <Link
          className="btn hover:scale-104 px-10 py-6"
          to="/availableFoods"
        >
          View All Foods
        </Link>
      </motion.div>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt="slide"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
