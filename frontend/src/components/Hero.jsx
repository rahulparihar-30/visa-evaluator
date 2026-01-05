import React from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-slate-900 px-20 pt-16 pb-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 -translate-x-[20%] -translate-y-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[100px]" />
      <div className="absolute bottom-0 right-0 translate-x-[20%] translate-y-[10%] w-[600px] h-[600px] rounded-full bg-teal-500/20 blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 font-medium text-sm">
              ✨ Trusted by 10,000+ applicants
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Simplify Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                Visa Application
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Get an instant, AI-powered evaluation of your visa eligibility. We guide you through every step to ensure the highest success rate for your dream destination.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to={`${localStorage.getItem("userId") ? `/result/${localStorage.getItem("userId")}` : "/evaluate"}`}>
                <Button className="w-full sm:w-auto text-lg px-8 py-4">
                  Check Eligibility Free
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-slate-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                98% Success Rate
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 lg:aspect-square aspect-video group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
              <img
                src="/8758913.jpg"
                alt="Visa Application Process"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
