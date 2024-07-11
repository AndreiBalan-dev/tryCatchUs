import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    // <section id="home" className="h-screen flex flex-col items-center justify-center text-center">
    //   <Image className="w-64 h-64 mb-8 rounded-full shadow-lg border-4 border-white" src='/character.jpeg' width={512} height={512} alt="RPG Character" />
    //   <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">Welcome to RPG Olympics!</h1>
    //   <p className="text-xl text-center mb-8 text-white drop-shadow-md">Ready for the olympics? Get some insights</p>
    //   <button className="bg-primaryButton border-primaryButton text-black py-3 px-6 rounded-full shadow-lg hover:bg-primaryButtonHover transition duration-300 ease-in-out transform hover:scale-105">Start Adventure</button>
    // </section>
    <section id="home" className="h-screen flex flex-col items-center justify-center text-center p-4 md:p-8">
      <Image className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 mb-4 sm:mb-6 md:mb-8 rounded-full shadow-lg border-4 border-white" src='/character.jpeg' width={512} height={512} alt="RPG Character" />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">Welcome to RPG Olympics!</h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center mb-4 sm:mb-6 md:mb-8 text-white drop-shadow-md">Ready for the olympics? Get some insights</p>
      <button className="bg-primaryButton border-primaryButton text-black py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-primaryButtonHover transition duration-300 ease-in-out transform hover:scale-105">Start Adventure</button>
    </section>

  );
};

export default Hero;
