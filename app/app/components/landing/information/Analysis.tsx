import React from "react";
import Image from "next/image";
import "../../../styles/rpgtheme.css";

const Analysis = () => {
  return (
    <section id="analysis" className="min-h-screen flex flex-col p-4 md:p-8">
      <div className="flex flex-col text-center mb-32">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Analysis</h2>
        <p className="text-base sm:text-lg md:text-xl mb-4">
          In-depth analysis of the events and athletes.
        </p>
      </div>
      <div className="rpg-box min-w-fit p-8 md:p-12 flex flex-col md:flex-row items-center text-center gap-8 md:gap-16">
        <div className="md:w-1/2 flex flex-col items-center md:items-start md:text-left mb-8 md:mb-0">
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            tellus nisi cursus id auctor non, molestie quis justo.
          </p>
          <p className="mb-4">
            Vivamus pellentesque cursus dolor, non facilisis sapien varius nec.
            Suspendisse potenti.
          </p>
          <button className="mt-4 md:mt-10 bg-primaryButton border-primaryButton text-black py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-primaryButtonHover transition duration-300 ease-in-out transform hover:scale-105">
            Read More
          </button>
        </div>
        <div className="md:w-1/2 min-w-64 mr-4 hidden md:block">
          <Image
            src="/analysis-image.jpg"
            alt="Analysis Image"
            width={600}
            height={800}
            className="rounded-lg shadow-lg ml-auto"
          />
        </div>
      </div>
      <div className="md:hidden mt-8">
        <Image
          src="/analysis-image.jpg"
          alt="Analysis Image"
          width={600}
          height={800}
          className="rounded-lg shadow-lg mx-auto min-w-[255px]"
        />
      </div>
    </section>
  );
};

export default Analysis;
