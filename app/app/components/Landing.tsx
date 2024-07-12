"use client";
import React, { useRef } from "react";
import Hero from "./landing/Hero";
import Information from "./landing/Information";
import Contact from "./landing/Contact";

const Landing = () => {
  const scrollToRef = useRef<HTMLElement>(null);
  return (
    <div className="bg-primaryBackground text-primaryText">
      <Hero scrollToRef={scrollToRef} />
      <Information scrollToRef={scrollToRef} />
      <Contact />
    </div>
  );
};

export default Landing;
