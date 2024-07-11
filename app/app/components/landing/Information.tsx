import React from "react";

const Information = () => {
  return (
    <>
      <section
        id="analysis"
        className="h-screen flex flex-col items-center justify-center text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Analysis</h2>
        <p className="text-lg mb-8">
          In-depth analysis of the events and athletes.
        </p>
      </section>
      <section
        id="predictions"
        className="h-screen flex flex-col items-center justify-center text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Predictions</h2>
        <p className="text-lg mb-8">
          Our expert predictions for the outcomes of the games.
        </p>
      </section>
    </>
  );
};

export default Information;
