import React, { useRef } from "react";
import "animate.css";
import { useInView } from "../../hooks/useInView";
import Link from "next/link";

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });

  return (
		<section
			ref={sectionRef}
			id="contact"
			className="h-screen flex flex-col items-center justify-center text-center"
		>
			<div
				className={`${isInView ? "animate__animated animate__fadeInDown" : ""}`}
			>
				<h2 className="text-4xl font-bold mb-4">Contact Us</h2>
			</div>
			<div
				className={`${isInView ? "animate__animated animate__fadeInUp" : ""}`}
			>
				<p className="text-lg mb-8">
					Get in touch with our team for more information.
				</p>
				<Link href="https://github.com/AndreiBalan-dev/tryCatchUs/issues/new">
					<button className="bg-primaryButton text-secondaryText cursor-pointer hover:bg-primaryButtonHover py-4 px-8 rounded-full shadow-lg border-2 border-primaryButtonBorder animate__animated animate__pulse">
						Contact Us
					</button>
				</Link>
			</div>
		</section>
	);
};

export default Contact;
