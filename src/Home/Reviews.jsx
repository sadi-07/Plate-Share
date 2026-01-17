import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ayesha Rahman",
    role: "Food Donor",
    comment:
      "PlateShare made donating extra food simple and meaningful.",
  },
  {
    name: "Imran Hossain",
    role: "Student",
    comment:
      "I found meals when I needed them most. Respect to this platform.",
  },
  {
    name: "Nusrat Jahan",
    role: "Volunteer",
    comment:
      "This is how technology should serve communities.",
  },
];

const Reviews = () => {
  return (
    <section className="px-6 py-10 rounded-2xl mt-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14">
        What People Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            data-aos="fade-up"
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow border"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              “{r.comment}”
            </p>
            <h4 className="font-semibold text-primary">{r.name}</h4>
            <span className="text-sm text-gray-500">{r.role}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
