const faqs = [
  {
    q: "Is PlateShare free to use?",
    a: "Yes. Sharing and collecting food is completely free.",
  },
  {
    q: "Is the food safe?",
    a: "Food is shared by verified users with expiry visibility.",
  },
  {
    q: "Who can use PlateShare?",
    a: "Anyone who wants to share or receive food responsibly.",
  },
];

const FAQhome = () => {
  return (
    <section className="px-6 py-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Frequently Asked <span className="text-primary">Questions</span>
      </h2>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((f, i) => (
          <div
            key={i}
            data-aos="fade-up"
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border"
          >
            <h4 className="font-semibold text-xl mb-2 text-white">{f.q}</h4>
            <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQhome;
