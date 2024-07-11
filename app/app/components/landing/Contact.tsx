// app/components/Contact.tsx
import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="h-screen flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
      <p className="text-lg mb-8">
        Get in touch with our team for more information.
      </p>
      <button className="bg-primaryButton text-secondaryText hover:bg-primaryButtonHover py-4 px-8 rounded-full shadow-lg border-2 border-primaryButtonBorder">
        Contact Us
      </button>
    </section>
  );
};

export default Contact;
