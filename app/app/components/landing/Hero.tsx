"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import "animate.css";
import "../../styles/dialogbox.css";

const Hero = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isDialogOpen) {
      const fullMessage = "Hello there! Ready for the adventure?";
      let index = 0;
      const interval = setInterval(() => {
        setMessage((prev) => prev + fullMessage[index]);
        index++;
        if (index === fullMessage.length) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setMessage("");
    }
  }, [isDialogOpen]);

  const handleDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <section
        id="home"
        className="h-screen flex flex-col items-center justify-center text-center p-4 md:p-8"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="">
              <div className="relative group">
                {isDialogOpen && (
                  <div className="dialog-box text-black absolute left-full bottom-full min-w-60">
                    {message}
                  </div>
                )}
                <Image
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 mb-4 sm:mb-6 md:mb-8 rounded-full shadow-lg border-4 border-white transition-transform duration-300 ease-in-out transform group-hover:scale-110 cursor-pointer"
                  src="/character.jpeg"
                  width={512}
                  height={512}
                  alt="RPG Character"
                  onClick={handleDialog}
                />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent
            sideOffset={30}
            side="top"
            align="center"
            className="bg-gray-800 text-white p-2 rounded-md shadow-lg text-xs transition-opacity duration-300 ease-in-out animate__animated animate__fadeIn"
          >
            Click to interact
          </TooltipContent>
        </Tooltip>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">
          Welcome to RPG Olympics!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-center mb-4 sm:mb-6 md:mb-8 text-white drop-shadow-md">
          Ready for the olympics? Get some insights
        </p>
        <button className="bg-primaryButton border-primaryButton text-black py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-primaryButtonHover transition duration-300 ease-in-out transform hover:scale-105">
          Start Adventure
        </button>
      </section>
    </TooltipProvider>
  );
};

export default Hero;
