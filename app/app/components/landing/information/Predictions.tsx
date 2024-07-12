"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../../../styles/rpgtheme.css";

const Predictions = () => {
  const images = [
    "/analysis-image.jpg",
    "/character.jpeg",
    "/analysis-image.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="predictions"
      className="min-h-screen flex flex-col items-center justify-center text-center p-4"
    >
      <div className="flex flex-col text-center mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Predictions</h2>
        <p className="text-base sm:text-lg md:text-xl mb-4">
          Our expert predictions for the outcomes of the games.
        </p>
      </div>
      <div className="relative mw-full max-w-5xl flex items-center justify-center space-x-4 flex-wrap space-y-4 sm:space-y-0 sm:flex-nowrap">
        {images.map((src, index) => {
          let positionClass = "";
          if (index === currentImageIndex) {
            positionClass = "z-20 scale-110 opacity-100";
          } else if (
            index === (currentImageIndex + 1) % images.length ||
            index === (currentImageIndex - 1 + images.length) % images.length
          ) {
            positionClass = "z-10 scale-90 opacity-70";
          } else {
            positionClass = "z-0 scale-90 opacity-70";
          }

          return (
            <div
              key={index}
              className={`transition-all duration-500 transform ${positionClass} w-2/3 sm:w-1/2 md:w-1/3`}
            >
              <Image
                src={src}
                alt={`Prediction ${index + 1}`}
                width={500}
                height={600}
                className="rounded-lg shadow-lg object-cover min-w-[250px]"
              />
            </div>
          );
        })}
      </div>
      <div className="mt-8 md:mt-16">
        <p>Click the button below!</p>
        <button className="mt-4 md:mt-10 bg-primaryButton border-primaryButton text-black py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-primaryButtonHover transition duration-300 ease-in-out transform hover:scale-105">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Predictions;
