import { motion } from "framer-motion";
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="px-6 py-24 text-center">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="text-5xl font-extrabold mb-6"
      >
        Share a Plate. Change a Life.
      </motion.h2>

      <p className="text-gray-600 dark:text-gray-300 mb-10">
        Join thousands reducing food waste and helping communities.
      </p>

      <Link
        to="/register"
        className="inline-block bg-primary text-white px-12 py-4 rounded-xl font-semibold shadow-lg"
      >
        Get Started
      </Link>
    </section>
  );
};

export default CTA;
