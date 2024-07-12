"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "animate.css";
import { useInView } from "../../../hooks/useInView";
import "../../../styles/rpgtheme.css";
import Link from "next/link";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import apiConfig from ".././../../apiConfig.json";

interface CountryOption {
  value: string;
  label: string;
}

interface CountryData {
  total_athletes: number;
  total_medals: number;
  total_golds: number;
  male_female_ratio: number;
  medals_per_athlete: number;
  gold_per_athlete: number;
}

const Predictions = () => {
  const images = [
    "/analysis-image.jpg",
    "/character.jpeg",
    "/analysis-image.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { threshold: 0.0 });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isPredictionVisible, setIsPredictionVisible] = useState(false);
  const [country, setCountry] = useState<SingleValue<CountryOption> | null>(
    null
  );
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const fetchCountryData = async (country: string) => {
    try {
      const [athletesResponse, medalsResponse, maleResponse, femaleResponse] =
        await Promise.all([
          axios.get(`${apiConfig.api}/2021/athletes?country=${country}`),
          axios.get(`${apiConfig.api}/2021/medals?country=${country}`),
          axios.get(
            `${apiConfig.api}/2021/genders?gender=Male&country=${country}`
          ),
          axios.get(
            `${apiConfig.api}/2021/genders?gender=Female&country=${country}`
          ),
        ]);

      const total_athletes = athletesResponse.data.total;
      const total_medals = medalsResponse.data.total;
      const total_golds = medalsResponse.data.gold;
      const total_male = maleResponse.data.total;
      const total_female = femaleResponse.data.total;

      const male_female_ratio =
        total_female > 0 ? total_male / total_female : 0;
      const medals_per_athlete =
        total_athletes > 0 ? total_medals / total_athletes : 0;
      const gold_per_athlete =
        total_athletes > 0 ? total_golds / total_athletes : 0;

      console.log("Fetched country data:", {
        total_athletes,
        total_medals,
        total_golds,
        male_female_ratio,
        medals_per_athlete,
        gold_per_athlete,
      });

      setCountryData({
        total_athletes,
        total_medals,
        total_golds,
        male_female_ratio,
        medals_per_athlete,
        gold_per_athlete,
      });
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  const handleCountryChange = (selectedOption: SingleValue<CountryOption>) => {
    setCountry(selectedOption);
    if (selectedOption) {
      fetchCountryData(selectedOption.value);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!countryData) return;

    try {
      const response = await axios.get(`${apiConfig.api}/predict`, {
        params: {
          total_athletes: countryData.total_athletes,
          total_medals: countryData.total_medals,
          gold_per_athlete: countryData.gold_per_athlete.toFixed(2),
          medals_per_athlete: countryData.medals_per_athlete.toFixed(2),
          male_female_ratio: countryData.male_female_ratio.toFixed(2),
        },
      });

      console.log("Prediction response:", response.data);
      setPrediction((parseFloat(response.data.prediction) / 1000).toFixed(3));
      setIsFormVisible(false);
      setIsPredictionVisible(true);
    } catch (error) {
      console.error("Error submitting prediction:", error);
    }
  };

  const handleClosePrediction = () => {
    setIsPredictionVisible(false);
    setPrediction(null);
  };

  return (
    <div className="bg-[#001524] text-[#FAFAFF] min-h-screen">
      <section
        ref={sectionRef}
        id="predictions"
        className="min-h-screen flex flex-col items-center justify-center text-center p-4"
      >
        <div
          className={`flex flex-col text-center mb-20 ${
            isInView ? "animate__animated animate__fadeInDown" : ""
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Predictions</h2>
          <p className="text-base sm:text-lg md:text-xl mb-4">
            Our AI based predictions for the outcomes of the games.
          </p>
        </div>
        <div
          className={`min-w-[300px] sm:mr-0 relative mw-full max-w-5xl flex items-center justify-center space-x-4 flex-wrap space-y-4 sm:space-y-0 sm:flex-nowrap ${
            isInView ? "animate__animated animate__fadeIn" : ""
          }`}
        >
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
                className={`min-w-[300px] transition-all duration-500 transform ${positionClass} w-2/3 sm:w-1/2 md:w-1/3`}
              >
                <Image
                  src={src}
                  alt={`Prediction ${index + 1}`}
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg object-cover min-w-[250px]"
                />
              </div>
            );
          })}
        </div>
        <div className="mt-8 md:mt-16">
          <p>Click the button below!</p>
          <Link
            href={`${apiConfig.api}/docs#/default/predict_score_predict_get`}
          >
            <button className="mt-4 md:mt-10 bg-primaryButton border-primaryButton cursor-pointer text-black py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-primaryButtonHover transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__pulse">
              Open Predictor
            </button>
          </Link>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-[#273469] rounded-full text-[#FAFAFF] py-2 px-4 hover:bg-[#1E2749]"
          >
            Show Form
          </button>
        </div>
      </section>

      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#FAFAFF] text-[#001524] p-6 rounded-lg shadow-lg relative w-full max-w-md mx-auto">
            <button
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <h2 className="text-xl mb-4">Country Prediction Form</h2>
            <form onSubmit={handleFormSubmit}>
              <Select
                options={[
                  { value: "Japan", label: "Japan" },
                  { value: "United%20States%20of%20America", label: "USA" },
                  // Add more options as needed
                ]}
                value={country}
                onChange={handleCountryChange}
                placeholder="Select a country"
                className="mb-4"
              />
              {countryData && (
                <div className="mb-4">
                  <p style={{ fontSize: "12px" }}>
                    <i>In 2021:</i>
                  </p>
                  <p>Total Athletes: {countryData.total_athletes}</p>
                  <p>Total Medals: {countryData.total_medals}</p>
                  <p>Total Golds: {countryData.total_golds}</p>
                  <p>
                    Medals Per Athlete:{" "}
                    {countryData.medals_per_athlete.toFixed(2)}
                  </p>
                  <p>
                    Gold Per Athlete: {countryData.gold_per_athlete.toFixed(2)}
                  </p>
                </div>
              )}
              <button
                type="submit"
                className="bg-[#273469] text-[#FAFAFF] py-2 px-4 rounded hover:bg-[#1E2749]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {isPredictionVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#FAFAFF] text-[#001524] p-6 rounded-lg shadow-lg relative w-full max-w-md mx-auto">
            <button
              onClick={handleClosePrediction}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <h2 className="text-xl mb-4">Here is the prediction value:</h2>
            <p className="text-lg">It's: {prediction}</p>
            <p style={{ fontSize: "12px" }}>
              <i>
                The prediction score is calculated by our model based on past
                data. The higher the composite score is, the higher ranking it
                will attain in the Olympics.
              </i>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Predictions;
