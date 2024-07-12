import React from "react";
import Analysis from "./information/Analysis";
import Predictions from "./information/Predictions";

type InformationProps = {
  scrollToRef: React.RefObject<HTMLElement>;
};

const Information: React.FC<InformationProps> = ({ scrollToRef }) => {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <Analysis scrollToRef={scrollToRef} />
      <Predictions />
    </div>
  );
};

export default Information;
