// app/components/Footer.tsx
import React from "react";

const Footer = ({ fontClass }: { fontClass: string }) => {
  return (
    <footer
      className={`bg-gray-800 text-white py-4 w-full text-center text-xs ${fontClass}`}
    >
      <p>&copy; 2024 try{`{CatchUs}`}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
