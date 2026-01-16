import { motion } from "framer-motion";
import { useState } from "react";

const blogs = [
  {
    id: 1,
    title: "Why Food Sharing Can Change Communities",
    excerpt:
      "Food sharing is more than kindness — it builds trust, reduces waste, and strengthens local communities.",
    content:
      "Plate Share helps reduce food waste while creating meaningful connections. When surplus food reaches someone in need, it turns waste into hope and communities grow stronger.",
    tag: "Community",
  },
  {
    id: 2,
    title: "How Plate Share Reduces Food Waste",
    excerpt:
      "Millions of meals go to waste every day. Here’s how Plate Share helps stop that.",
    content:
      "By connecting donors with nearby recipients, Plate Share ensures edible food never ends up in landfills. Our platform promotes responsible consumption and sustainable sharing.",
    tag: "Sustainability",
  },
  {
    id: 3,
    title: "Safe Food Donation: Best Practices",
    excerpt:
      "Sharing food is great — but safety comes first. Learn the essentials.",
    content:
      "We encourage donors to label food clearly, respect expiry times, and follow hygienic storage. Plate Share promotes trust through transparency and responsibility.",
    tag: "Safety",
  },
  {
    id: 4,
    title: "Technology for Social Good",
    excerpt:
      "How modern web platforms can solve real-world problems.",
    content:
      "Plate Share is built using modern web technologies to create real social impact. Technology becomes meaningful when it serves humanity.",
    tag: "Tech",
  },
];

const Blog = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="min-h-screen px-4 py-20 max-w-6xl mx-auto">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mt-5 mb-5 text-primary">
          Plate Share Blog
        </h1>
        <p className="space-y-6 text-xl text-gray-600 font-bold">
          Stories, ideas, and insights about food sharing, sustainability, and
          building stronger communities.
        </p>
      </motion.div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <span className="inline-block text-sm mb-2 px-3 py-1 rounded-full bg-secondary text-black font-semibold">
              {blog.tag}
            </span>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              {blog.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {blog.excerpt}
            </p>

            {openId === blog.id && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-700 dark:text-gray-200 mb-4"
              >
                {blog.content}
              </motion.p>
            )}

            <button
              onClick={() =>
                setOpenId(openId === blog.id ? null : blog.id)
              }
              className="text-primary font-semibold hover:underline"
            >
              {openId === blog.id ? "Show Less ↑" : "Read More →"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
