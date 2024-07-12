import React from "react";
import Landing from "./components/Landing";

const Main = ({ fontClass }: { fontClass: string }) => {
  return (
    <div className={fontClass}>
      <Landing />
    </div>
  );
};

export default Main;
