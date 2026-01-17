import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const NewsLetter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    Swal.fire({
      title: "Subscribed!",
      text: `Thanks for joining PlateShare, ${data.email}`,
      icon: "success",
      confirmButtonText: "Awesome!",
      confirmButtonColor: "#16a34a",
    });

    reset();
  };

  return (
    <section className="px-6 py-20 bg-gray-300/50 rounded-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Stay Connected
        </h2>
        <p className="text-gray-600 font-semibold text-lg mb-8">
          Get updates on food sharing, impact stories, and new features.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-4 flex-col sm:flex-row"
        >
          <div className="flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-lg border-none bg-white outline-none focus:ring-0 text-gray-700"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2 text-left">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsLetter;
