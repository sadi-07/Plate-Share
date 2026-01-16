import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="min-h-screen px-4 py-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mt-5 mb-10 text-primary">
          Your Privacy Matters
        </h1>

        <div className="space-y-6 text-lg text-gray-600 font-semibold">
          <p>
            <strong className="font-bold text-xl text-primary">Plate Share</strong> collects only the information required to deliver our
            services — nothing more.
          </p>

          <p>
            We <strong>never sell</strong> your personal data and use secure
            authentication systems to protect your account.
          </p>

          <p>
            Your activity, posts, and communication remain private and are used
            solely to improve platform experience.
          </p>

          <div className="p-6 rounded-xl bg-gray-900 shadow">
            <strong className="text-primary">
              Transparency. Security. Control.
            </strong>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
