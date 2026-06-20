import React from "react";
import Button from "../../../components/Button";
import { routes } from "../../../constants/routes";
import { Link } from "@tanstack/react-router";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-indigo-600 to-indigo-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Start collecting student payments the smart way
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-indigo-100 text-base sm:text-lg max-w-2xl mx-auto">
          Create payment links, track contributions, and manage everything in
          one place. No spreadsheets. No stress.
        </p>

        {/* Micro trust text */}
        <p className="mt-4 text-indigo-200 text-sm">
          Takes less than 2 minutes to get started
        </p>

        {/* Button */}
        <div className="mt-10 flex items-center justify-center">
          <Link to={routes.SIGNUP}>
            <Button className="px-6 py-3 rounded-full text-indigo-700 transition">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
