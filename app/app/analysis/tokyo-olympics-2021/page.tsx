"use client";
import React, { useState, useEffect } from "react";
import apiConfig from "../../apiConfig.json";

interface Athlete {
  name: string;
  sport: string;
  country: string;
}

interface DataResponse {
  countries: string[];
  sports: string[];
  genders: string[];
}

interface AthletesData {
  total: number;
}

interface CoachesData {
  total: number;
}

interface GendersData {
  total: number;
}

const TokyoOlympicsAnalysis = () => {
  const [totalAthletes, setTotalAthletes] = useState<number | null>(null);
  const [totalCoaches, setTotalCoaches] = useState<number | null>(null);
  const [totalGenders, setTotalGenders] = useState<number | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [sports, setSports] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");

  const fetchData = async () => {
    const resp = await fetch(`${apiConfig.api}/2021/get/athletes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: DataResponse = await resp.json();

    setCountries(data.countries);
    setSports(data.sports);

    // Fetch athletes and coaches count only once both filters are set
    if (selectedSport && selectedCountry && selectedGender) {
      const athletesResp = await fetch(
        `${apiConfig.api}/2021/athletes?sport=${selectedSport}&country=${selectedCountry}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const athletesData: AthletesData = await athletesResp.json();
      console.log(athletesData);
      setTotalAthletes(athletesData.total);

      const coachesResp = await fetch(
        `${apiConfig.api}/2021/coaches?sport=${selectedSport}&country=${selectedCountry}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const coachesData: CoachesData = await coachesResp.json();
      console.log(coachesData);
      setTotalCoaches(coachesData.total);

      const gendersResp = await fetch(
        `${apiConfig.api}/2021/genders?sport=${selectedSport}&gender=${selectedGender}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const gendersData: GendersData = await gendersResp.json();
      console.log(gendersData);
      setTotalGenders(gendersData.total);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const respAthletes = await fetch(`${apiConfig.api}/2021/get/athletes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataAthletes: DataResponse = await respAthletes.json();

      const respGenders = await fetch(`${apiConfig.api}/2021/get/genders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataGenders: DataResponse = await respGenders.json();

      setCountries(dataAthletes.countries);
      setSports(dataAthletes.sports);
      setGenders(dataGenders.genders);
    };
    fetchInitialData();
    fetchData();
  }, [selectedSport, selectedCountry, selectedGender]);

  return (
    <div className="flex h-full bg-primaryBackground text-primaryText">
      <div className="w-1/3 p-4">
        <div>
          <label
            htmlFor="sports"
            className="block text-sm font-medium text-gray-700"
          >
            Select a Sport
          </label>
          <select
            id="sports"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="text-black mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">-- Select a Sport --</option>
            {sports.map((sport, index) => (
              <option key={index} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label
            htmlFor="countries"
            className="block text-sm font-medium text-gray-700"
          >
            Select a Country
          </label>
          <select
            id="countries"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="text-black mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">-- Select a Country --</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label
            htmlFor="genders"
            className="block text-sm font-medium text-gray-700"
          >
            Select a Gender
          </label>
          <select
            id="genders"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="text-black mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">-- Select a Gender --</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-2/3 p-4">
        {totalAthletes !== null && (
          <div>
            <h2 className="mt-3 text-xl font-bold">Athletes Information</h2>
            <p>
              <strong>Total Athletes:</strong> {totalAthletes} athletes from{" "}
              {selectedCountry} participating in {selectedSport}.
            </p>
          </div>
        )}
        {totalCoaches !== null && (
          <div>
            <h2 className="mt-6 text-xl font-bold">Coaches Information</h2>
            <p>
              <strong>Total Coaches:</strong> {totalCoaches} coaches from{" "}
              {selectedCountry} coaching in {selectedSport}.
            </p>
          </div>
        )}
        {totalGenders !== null && (
          <div>
            <h2 className="mt-6 text-xl font-bold">Gender Information</h2>
            <p>
              <strong>Total Participants:</strong> {totalGenders}{" "}
              {selectedGender} participants in {selectedSport}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokyoOlympicsAnalysis;
