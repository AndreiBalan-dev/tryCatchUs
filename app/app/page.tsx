// app/page.tsx
import React from "react";

const Main = ({ fontClass }: { fontClass: string }) => {
  return (
    <div className={`${fontClass} bg-primaryBackground text-primaryText`}>
      <section
        id="home"
        className="h-screen flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-5xl font-bold mb-4">Olympics Paris 2024</h1>
        <p className="text-xl mb-8">
          Welcome to the ultimate analysis and prediction site for the Paris
          2024 Olympics!
        </p>
      </section>
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
      <section
        id="contact"
        className="h-screen flex flex-col items-center justify-center text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-8">
          Get in touch with our team for more information.
        </p>
      </section>
    </div>
  );
};

export default Main;
