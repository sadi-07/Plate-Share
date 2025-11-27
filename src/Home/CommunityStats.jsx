import React, { useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";

const stats = [
  { label: "Meals Shared", value: 4200 },
  { label: "Active Users", value: 1900 },
  { label: "Communities Helped", value: 85 },
  { label: "Food Saved (kg)", value: 3200 },
];

const CommunityStats = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((num, i) =>
          num < stats[i].value
            ? num + Math.ceil(stats[i].value / 60)
            : stats[i].value
        )
      );
    }, 20);

    return () => clearInterval(interval);
  }, []);

  
  const springs = useSprings(
    stats.length,
    stats.map((_, i) => ({
      from: { transform: "scale(0.8)" },
      to: { transform: "scale(1)" },
      delay: i * 120,
      config: { tension: 170, friction: 14 },
    }))
  );

  return (
    <section className="px-6 py-20">
      <h2
        data-aos="fade-up"
        className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-12">
        Community Impact
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {springs.map((style, i) => (
          <animated.div
            key={i}
            style={style}
            data-aos="zoom-in"
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md text-center border border-gray-200 dark:border-gray-700"
          >
            <p className="text-4xl font-bold text-primary mb-3">
              {counts[i]}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {stats[i].label}
            </p>
          </animated.div>
        ))}
      </div>
    </section>
  );
};

export default CommunityStats;
