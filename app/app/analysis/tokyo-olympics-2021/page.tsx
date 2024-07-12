"use client"
import React, { useState, useEffect } from 'react';
import apiConfig from "../../../apiConfig.json";

interface Athlete {
  name: string;
  sport: string;
  country: string;
}

const TokyoOlympicsAnalysis = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [sports, setSports] = useState<string[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>([]);

  const fetchData = async () => {
    const resp = await fetch(`${apiConfig.api}/2021/athletes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data: Athlete[] = await resp.json();
    setAthletes(data);

    const uniqueCountries = Array.from(new Set(data.map(athlete => athlete.country)));
    setCountries(uniqueCountries);

    const uniqueSports = Array.from(new Set(data.map(athlete => athlete.sport)));
    setSports(uniqueSports);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = athletes.filter(athlete => 
      (selectedSport ? athlete.sport === selectedSport : true) &&
      (selectedCountry ? athlete.country === selectedCountry : true)
    );
    setFilteredAthletes(filtered);
  }, [selectedSport, selectedCountry, athletes]);

  return (
    <div className='flex h-full bg-primaryBackground text-primaryText'>
      <div className='w-1/3 p-4'>
        <div>
          <label htmlFor="sports" className="block text-sm font-medium text-gray-700">Select a Sport</label>
          <select
            id="sports"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">-- Select a Sport --</option>
            {sports.map((sport, index) => (
              <option key={index} value={sport}>{sport}</option>
            ))}
          </select>
        </div>
        <div className='mt-4'>
          <label htmlFor="countries" className="block text-sm font-medium text-gray-700">Select a Country</label>
          <select
            id="countries"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">-- Select a Country --</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='w-2/3 p-4'>
        {filteredAthletes.length > 0 && (
          <div>
            <h2 className='text-xl font-bold'>Athletes Information</h2>
            <ul>
              {filteredAthletes.map((athlete, index) => (
                <li key={index}>
                  <strong>Name:</strong> {athlete.name}, <strong>Sport:</strong> {athlete.sport}, <strong>Country:</strong> {athlete.country}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokyoOlympicsAnalysis;
