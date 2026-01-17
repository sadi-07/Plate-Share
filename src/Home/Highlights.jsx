import { motion } from "framer-motion";
import { Leaf, Users, Clock } from "lucide-react";

const highlights = [
  {
    icon: <Leaf size={36} />,
    title: "Reduce Food Waste",
    desc: "Turn surplus food into meaningful impact instead of waste.",
  },
  {
    icon: <Users size={36} />,
    title: "Community Driven",
    desc: "Built by people, for people — trust powered by community.",
  },
  {
    icon: <Clock size={36} />,
    title: "Real-Time Sharing",
    desc: "Post and collect food quickly before it expires.",
  },
];

const Highlights = () => {
  return (
    <section className="px-6 py-20 rounded-2xl mb-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14">
        Why <span className="text-primary">PlateShare</span> Works
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            data-aos="fade-up"
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow border border-gray-200 dark:border-gray-700 text-center"
          >
            <div className="text-primary flex justify-center mb-5">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
            <p className="text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
