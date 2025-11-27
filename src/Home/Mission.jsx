import React from 'react';
import { useSpring, animated } from "@react-spring/web";

const Mission = () => {
  const fadeUp = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    config: { tension: 120, friction: 15 },
  });

  return (
    <section className="px-6 py-20 bg-white dark:bg-gray-900 rounded-2xl">
      <animated.div style={fadeUp} className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          At <strong>PlateShare</strong>, our mission is simple — reduce food waste and
          connect communities. We believe that a single shared meal can
          inspire kindness, strengthen neighborhoods, and nourish those in
          need. By making sharing easy and accessible, we’re building a
          sustainable culture where no food goes to waste.
        </p>
      </animated.div>
    </section>
  );
};

export default Mission;

