import React, { useState } from "react";


const faqs = [
  {
    q: "What is Plate Share?",
    a: "Plate Share is a platform where people can share surplus food with others to reduce food waste and help the community.",
  },
  {
    q: "Who can use Plate Share?",
    a: "Anyone can browse available foods. To add or request food, you need to create an account.",
  },
  {
    q: "Is Plate Share free to use?",
    a: "Yes, Plate Share is completely free for basic food sharing features.",
  },
  {
    q: "Do I need an account to see available foods?",
    a: "No. You can view available foods without logging in.",
  },
  {
    q: "How do I add food?",
    a: "After logging in, go to the dashboard and click on 'Add Food' to share food with others.",
  },
  {
    q: "How do food requests work?",
    a: "You can request food listed by others. The food owner can approve or reject your request.",
  },
  {
    q: "Is my personal information safe?",
    a: "Yes. We only collect necessary information and do not share it with third parties.",
  },
  {
    q: "Can I manage foods I added?",
    a: "Yes. Logged-in users can edit or delete their food listings from 'Manage My Foods'.",
  },
  {
    q: "What types of food can be shared?",
    a: "Fresh, cooked, and packaged foods that are safe for consumption can be shared.",
  },
  {
    q: "How does Plate Share help society?",
    a: "Plate Share reduces food waste and helps people in need by connecting donors and receivers.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <h2 className="text-4xl md:text-5xl font-extrabold mt-5 mb-10 text-primary">
        Frequently Asked Questions</h2>
        

      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 cursor-pointer bg-base-100"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold`}>
                {item.q}
              </h3>
              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>

            {openIndex === index && (
              <p className={`mt-3 leading-relaxed text-secondary font-semibold`}>
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
