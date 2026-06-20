import React from "react";
import { Link, Users, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Link,
    title: "Create a payment link",
    description:
      "Set an amount, title, and deadline in seconds. No setup stress, no technical steps.",
  },
  {
    icon: Users,
    title: "Share with your group",
    description:
      "Send the link to your class, group, or association. Everyone pays from their phone.",
  },
  {
    icon: BarChart3,
    title: "Track payments instantly",
    description:
      "See who has paid in real time and export records whenever you need them.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            How it works
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Collect student payments in 3 simple steps
          </h2>

          <p className="text-lg text-gray-500">
            No complexity. No confusion. Just a clean workflow that any class
            rep can use.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className="relative p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Step number */}
              <div className="absolute -top-4 left-6 bg-indigo-600 text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center shadow">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 mt-4 rounded-xl bg-indigo-50 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
