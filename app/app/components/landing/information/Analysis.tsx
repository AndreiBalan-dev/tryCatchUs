import React from "react";
import Image from "next/image";
import "animate.css";
import { useInView } from "../../../hooks/useInView";
import "../../../styles/rpgtheme.css";
import Link from "next/link";

type AnalysisProps = {
  scrollToRef: React.RefObject<HTMLElement>;
};

const Analysis: React.FC<AnalysisProps> = ({ scrollToRef }) => {
  const isInView = useInView(scrollToRef, { threshold: 0 });

  return (
    <section
      ref={scrollToRef}
      id="analysis"
      className="min-h-screen flex flex-col p-4 md:p-8"
    >
      <div
        className={`flex flex-col text-center mb-32 ${
          isInView ? "animate__animated animate__fadeInDown" : ""
        }`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Analysis</h2>
        <p className="text-base sm:text-lg md:text-xl mb-4">
          In-depth analysis of the events and athletes.
        </p>
      </div>
      <div
        className={`rpg-box min-w-fit p-8 md:p-12 flex flex-col md:flex-row items-center text-center gap-8 md:gap-16 ${
          isInView ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <div
          className={`md:w-1/2 flex flex-col items-center md:items-start md:text-left mb-8 md:mb-0 ${
            isInView ? "animate__animated animate__fadeInLeft" : ""
          }`}
        >
          <p className="mb-4">
            Our deep dive analysis includes the metrices of athletes, coaches,
            genders, and medals across various events. Using historical data of
            2021 olympics, we identify patterns and trends that are critical in
            predicting potential Olympic champions.
          </p>
          <p className="mb-4">
            Our predictive models consider multiple factors, including no. of
            gold medals received, no. of participants, and several other cool
            parameters.
          </p>
          <div className="mt-10 flex min-h-fit flex-col sm:flex-row justify-center items-center w-full space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/analysis/tokyo-olympics-2021">
              <button className="bg-primaryButton border-primaryButton cursor-pointer text-black py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-primaryButtonHover transition duration-300 ease-in-out transform hover:scale-105 custom-pulse">
                2021 Analysis
              </button>
            </Link>
            <Link href="/analysis/paris-olympics-2024">
              <button className="bg-primaryButton border-primaryButton cursor-pointer text-black py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-primaryButtonHover transition duration-300 ease-in-out transform hover:scale-105 custom-pulse">
                2024 Analysis
              </button>
            </Link>
          </div>
        </div>
        <div
          className={`md:w-1/2 min-w-64 mr-4 hidden md:block ${
            isInView ? "animate__animated animate__fadeInRight" : ""
          }`}
        >
          <Image
            src="/analysis-image.jpg"
            alt="Analysis Image"
            width={600}
            height={800}
            className="rounded-lg shadow-lg ml-auto"
          />
        </div>
      </div>
      <div
        className={`md:hidden mt-8 ${
          isInView ? "animate__animated animate__fadeInUp" : ""
        }`}
      >
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
