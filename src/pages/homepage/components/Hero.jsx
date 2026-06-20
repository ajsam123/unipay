import React from "react";
import Button from "../../../components/Button";
import hero from "../images/hero.png";
import { routes } from "../../../constants/routes";
import { Link } from "@tanstack/react-router";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pt-10 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Text Content */}
        <div className="flex flex-col">
          <span className="px-4 py-1 text-sm font-medium bg-gray-100 rounded-full text-gray-600 mb-6 w-max">
            Trusted Campus Payment Platform
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            The modern platform for student leaders to manage payments
          </h1>

          <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
            UniPay helps class reps and student leaders collect dues, track
            payments, and automate financial records securely and efficiently.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={routes.SIGNUP}>
              <Button className="px-6 py-3 rounded-full">Get Started</Button>
            </Link>

            <Button
              variant="stroke"
              className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Image */}
        <figure className="w-full flex justify-center">
          <img
            src={hero}
            alt="UniPay dashboard preview"
            className="w-full max-w-md md:max-w-full"
          />
        </figure>
      </div>
    </section>
  );
};

export default Hero;
