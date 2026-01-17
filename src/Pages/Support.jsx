import { motion } from "framer-motion";

const Support = () => {
  return (
    <div className="min-h-screen px-4 py-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mt-5 mb-10 text-primary">
          We’ve Got Your Back 💪
        </h1>

        <p className="text-xl text-gray-600 font-semibold mb-10">
          From account issues to food posting help — <strong className="font-bold text-xl text-primary">Plate Share</strong> support is here
          for you.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Posting or requesting food",
            "Login & account problems",
            "Reporting misuse or spam",
            "Platform feature guidance"
          ].map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-gray-900 shadow"
            >
              <p className="text-gray-200 font-semibold text-lg">
                ✅ {s}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-xl shadow outline-primary border-3 border-gray-900">
          <p className="text-2xl font-bold text-gray-500">
            Contact Support
          </p>
          <p className="text-gray-900 text-xl font-bold mt-3">
            support@plateshare.com
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Support;
