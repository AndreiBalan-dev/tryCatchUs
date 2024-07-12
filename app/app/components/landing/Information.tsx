import React from "react";
import Analysis from "./information/Analysis";
import Predictions from "./information/Predictions";

const Information = () => {
  return (
    <div className="flex flex-col gap-8">
      <Analysis />
      <Predictions />
    </div>
  );
};

export default Information;
