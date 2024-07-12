"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import "animate.css";
import "../../styles/dialogbox.css";
import { useInView } from "../../hooks/useInView";

type HeroProps = {
  scrollToRef: React.RefObject<HTMLElement>;
};

const Hero: React.FC<HeroProps> = ({ scrollToRef }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [triggerAgain, setTriggerAgain] = useState(false);
  const [lastIndex, setLastIndex] = useState(-1);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const getRandomMessage = (lastIndex: number) => {
    const messagesArray = [
      "Hello there! Ready for the adventure?",
      "Let's dive into the world of Olympics Paris 2024!",
      "Curious about the latest predictions? Click away!",
      "Want to explore some in-depth analysis? Let's go!",
      "Need more information? Feel free to ask anything!",
    ];
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * messagesArray.length);
    } while (randomIndex === lastIndex);
    return { message: messagesArray[randomIndex], index: randomIndex };
  };

  useEffect(() => {
    if (isDialogOpen) {
      const { message: fullMessage, index: newIndex } =
        getRandomMessage(lastIndex);
      setLastIndex(newIndex);
      let index = 0;
      const interval = setInterval(() => {
        setMessage((prev) => prev + fullMessage[index]);
        index++;
        if (index === fullMessage.length) {
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    } else {
      setMessage("");
    }
  }, [isDialogOpen, triggerAgain]);

  useEffect(() => {
    if (isInView) {
      const heroButton = document.getElementById("heroButton");
      if (heroButton) {
        setTimeout(() => {
          heroButton.classList.remove("animate__animated");
          heroButton.classList.remove("animate__pulse");
          heroButton.classList.remove("animate__infinite");
        }, 6800);
      }
    }
  }, [isInView]);

  const handleDialog = () => {
    setMessage("");
    setTriggerAgain(!triggerAgain);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setMessage("");
    setIsDialogOpen(false);
  };

  useEffect(() => {
    function handleResize() {
      const dialogBox = document.getElementById("dialogBox");
      const windowWidth = window.innerWidth;

      if (!dialogBox) return;

      if (windowWidth < 600) {
        dialogBox.classList.remove("left-full");
        dialogBox.classList.add("bottom-40");
        dialogBox.classList.add("-right-14");
        dialogBox.classList.add("-top-32");
      } else {
        dialogBox.classList.remove("bottom-40");
        dialogBox.classList.remove("-right-14");
        dialogBox.classList.remove("-top-32");
        dialogBox.classList.add("left-full");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isDialogOpen]);

  const scrollToAnalysis = () => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("scrollToRef is not attached to any element.");
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <section
        ref={sectionRef}
        id="hero"
        className="h-screen flex flex-col items-center justify-center text-center p-4 md:p-8"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="">
              <div className="relative group">
                {isDialogOpen && (
                  <div
                    className="dialog-box text-black absolute left-full bottom-full min-w-60 max-w-xs p-2 text-sm transition-all duration-300"
                    onClick={handleCloseDialog}
                    id="dialogBox"
                  >
                    {message}
                  </div>
                )}
                <Image
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 mb-4 sm:mb-6 md:mb-8 rounded-full shadow-lg border-4 border-white transition-transform duration-300 ease-in-out transform group-hover:scale-110 cursor-pointer animate__animated delay-1 animate__bounceIn"
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
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg ${
            isInView ? "animate__animated animate__fadeInDown" : ""
          }`}
        >
          Welcome to RPG Olympics!
        </h1>
        <p
          className={`text-lg sm:text-xl md:text-2xl text-center mb-4 sm:mb-6 md:mb-8 text-white drop-shadow-md ${
            isInView ? "animate__animated animate__fadeInUp" : ""
          }`}
        >
          Ready for the olympics? Get some insights
        </p>
        <button
          id="heroButton"
          onClick={scrollToAnalysis}
          className={`bg-primaryButton border-primaryButton text-black py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-primaryButtonHover cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
            isInView ? "animate__animated animate__pulse animate__infinite" : ""
          }`}
        >
          Start Adventure
        </button>
      </section>
    </TooltipProvider>
  );
};

export default Hero;
