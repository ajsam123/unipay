import React from "react";
import Button from "../../../components/Button";
import hero from "../images/hero.png";

const Hero = () => {
  return (
    <section className="grid items-center grid-cols-2 pt-5 pb-4">
      {/* Badge */}
      <div className="pl-5 flex flex-col text-center justify-center items-center">
        <span className="px-4 py-1 text-sm font-medium bg-gray-100 rounded-full text-gray-600 mb-6">
          Trusted Campus Payment Platform
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-[47px] font-bold text-gray-900 max-w-3xl">
          The modern way for student leaders to collect payments
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
          UniPay helps class reps and student leaders collect dues, track
          payments, and automate financial records securely and efficiently.
        </p>
        {/* CTA Buttons */}
        <div className="mt-8 flex items-center gap-4">
          <Button className="px-6 py-3 rounded-full">Get Started</Button>
          <Button
            variant="stroke"
            className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition"
          >
            Learn More
          </Button>
        </div>
      </div>
      <figure className="">
        <img src={hero} alt="" />
      </figure>
    </section>
  );
};

export default Hero;
