import React, { useEffect, useRef, useState } from "react";
import { Link, Users, Smartphone, BarChart2, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Link,
    title: "Instant payment links",
    description:
      "Create a payment link in seconds. No technical setup, no bank forms — just a title, amount, and you're done.",
  },
  {
    icon: Users,
    title: "Built for groups",
    description:
      "Whether it's 10 or 500 students, every payment is tracked under one link. No chasing individuals.",
  },
  {
    icon: Smartphone,
    title: "Pay from any device",
    description:
      "Students pay directly from their phones. No app download needed — just tap the link and pay.",
  },
  {
    icon: BarChart2,
    title: "Real-time tracking",
    description:
      "See who has paid and who hasn't, instantly. Export the list anytime for your records.",
  },
  {
    icon: Shield,
    title: "Secure transactions",
    description:
      "Every payment is encrypted and processed through trusted payment providers. Funds go straight to the right place.",
  },
  {
    icon: Zap,
    title: "Zero cash handling",
    description:
      "No more collecting money physically. No missing payments, no awkward follow-ups.",
  },
];

const Features = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.getAttribute("data-index");

          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, Number(index)])]);
          }
        });
      },
      { threshold: 0.2 },
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            Features
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Everything you need to collect payments on campus
          </h2>

          <p className="text-lg text-gray-500">
            Designed for how campus life actually works — fast, mobile-first,
            and simple enough for anyone to use.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              data-index={index}
              ref={(el) => (refs.current[index] = el)}
              className={`group p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-700
                ${
                  visibleItems.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-50/70 ring-1 ring-indigo-100 flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition">
                <Icon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:translate-x-0.5 transition-transform">
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

export default Features;
