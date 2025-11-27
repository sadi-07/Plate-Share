import React from 'react';
import { motion } from "framer-motion";
import { Utensils, Search, Hand } from "lucide-react";

const steps = [
  {
    title: "Post Food",
    description:
      "Share extra meals or ingredients with the community. Add details, upload a photo, and reduce waste.",
    icon: <Utensils size={40} />,
  },
  {
    title: "Find Food",
    description:
      "Browse shared food from nearby members. Filter by category, distance, freshness, and more.",
    icon: <Search size={40} />,
  },
  {
    title: "Collect Food",
    description:
      "Request an item, get pickup info, and collect it responsibly. Help the community and the environment.",
    icon: <Hand size={40} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-14"
      >
        How <span className='text-primary'>PlateShare</span> Works
      </motion.h2>

      <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.3, rotate: 3 }}
              className="text-primary mx-auto mb-6 flex justify-center"
            >
              {step.icon}
            </motion.div>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
