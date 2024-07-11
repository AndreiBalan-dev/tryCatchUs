// ExampleButton.tsx
import React from "react";

const Main = ({ fontClass }: { fontClass: string }) => {
  return (
    <div className={fontClass}>
      <button className="bg-primaryButton text-primaryText hover:bg-primaryButtonHover py-2 px-4 rounded">
        Click Me
      </button>
    </div>
  );
};

export default Main;
