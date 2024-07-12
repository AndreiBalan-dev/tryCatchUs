import React from "react";
import Hero from "./landing/Hero";
import Information from "./landing/Information";
import Contact from "./landing/Contact";

const Landing = () => {
  return (
    <div className="bg-primaryBackground text-primaryText">
      <Hero />
      <Information />
      <Contact />
    </div>
  );
};

export default Landing;
