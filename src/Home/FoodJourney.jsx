import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import donation from "../assets/donation.png"
import collect from "../assets/imagexd.png"
import served from "../assets/served.png"

const flow = [
  {
    img: donation,
    title: "Shared from Home",
    desc: "Extra food shared before it goes to waste.",
  },
  {
    img: collect,
    title: "Picked Up",
    desc: "Collected safely by volunteers or neighbors.",
  },
  {
    img: served,
    title: "Served with Love",
    desc: "Delivered to someone who truly needs it.",
  },
];

const FoodJourney = () => {
  return (
    <section className="px-6 py-10 text-white rounded-2xl overflow-hidden">
      <h2 className="text-4xl md:text-5xl text-gray-900 font-extrabold text-center mb-20">
        A Meal’s Journey
      </h2>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {flow.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            {/* CARD */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-2xl shadow-xl p-5 w-72 text-center"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">
                {item.title}
              </h4>
              <p className="text-gray-400 text-sm">
                {item.desc}
              </p>
            </motion.div>

            {/* ARROW */}
            {i !== flow.length - 1 && (
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden md:flex text-primary"
              >
                <ArrowRight size={40} />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodJourney;
