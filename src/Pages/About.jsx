import { motion } from "framer-motion";

const About = () => {
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen px-4 py-20 flex justify-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full"
      >
        <motion.h1
          variants={item}
          //className="text-4xl md:text-5xl font-extrabold text-primary mb-6"
          className="text-4xl md:text-5xl font-extrabold mt-5 mb-10 text-primary"
        >
          Share a Plate. Spread a Smile.
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg font-semibold leading-relaxed text-gray-600 mb-10"
        >
          <strong className="text-primary font-bold text-xl">Plate Share</strong> is a community-powered food sharing platform
          designed to reduce food waste and connect surplus food with people who
          truly need it. We believe no meal should go to waste when someone nearby
          is hungry.
        </motion.p>

        {/* FEATURES */}
        <motion.div
          variants={container}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Reduce Food Waste",
              desc: "Post surplus meals instead of throwing them away."
            },
            {
              title: "Help Communities",
              desc: "Directly support people and shelters in need."
            },
            {
              title: "Real-Time Sharing",
              desc: "Instant food posts, requests, and updates."
            }
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              className="p-6 rounded-xl bg-gray-900 shadow"
            >
              <h3 className="text-2xl font-semibold text-primary mb-2">
                {f.title}
              </h3>
              <p className="text-gray-200 font-semibold">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
