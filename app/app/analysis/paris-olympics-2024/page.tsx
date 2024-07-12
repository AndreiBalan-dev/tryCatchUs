"use client";
import React, { useState, useEffect } from "react";
import apiConfig from "../../apiConfig.json";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EventsDataResponse {
  total_sports: number;
  total_events: number;
  sports: {
    [key: string]: {
      events: string[];
      no_of_events: number;
    };
  };
}

const ParisOlympicsAnalysis = () => {
  const [totalSports, setTotalSports] = useState<number | null>(null);
  const [totalEvents, setTotalEvents] = useState<number | null>(null);
  const [sportsData, setSportsData] = useState<
    EventsDataResponse["sports"] | null
  >(null);

  const fetchData = async () => {
    const resp = await fetch(`${apiConfig.api}/2024/get/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: EventsDataResponse = await resp.json();

    setTotalSports(data.total_sports);
    setTotalEvents(data.total_events);
    setSportsData(data.sports);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: sportsData ? Object.keys(sportsData) : [],
    datasets: [
      {
        label: "Number of Events",
        data: sportsData
          ? Object.values(sportsData).map((sport) => sport.no_of_events)
          : [],
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Paris Olympics 2024 Analysis",
      },
    },
  };

  return (
    <div className="flex flex-col h-full bg-primaryBackground text-primaryText">
      <div className="w-full p-4">
        {totalSports !== null && (
          <div>
            <h2 className="mt-3 text-xl font-bold">Total Sports</h2>
            <p>{totalSports}</p>
          </div>
        )}
        {totalEvents !== null && (
          <div>
            <h2 className="mt-6 text-xl font-bold">Total Events</h2>
            <p>{totalEvents}</p>
          </div>
        )}
        {sportsData !== null && (
          <div className="mt-8 min-h-[600px] min-w-[600px] max-h-[1000px] max-w-[1000px]">
            <Bar data={data} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ParisOlympicsAnalysis;
