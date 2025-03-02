import React from 'react';

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen bg-zinc-800 text-white flex flex-col items-center justify-between p-8">
      <div className="text-center max-w-3xl flex-1">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="mb-6 text-lg">
          At [yt_programmer BOOKSTORE], we believe books are more than just stories—they are gateways to new worlds, sources of knowledge, and keys to personal transformation. Our collection is carefully curated to offer something for everyone. Whether you're here for relaxation, to enhance your skills, or to explore new ideas, our bookstore has something that will speak to your heart and mind.
        </p>
        <p className="mb-6 text-lg">
          Every book we sell is a part of our mission to provide you with quality content that can transform your life. With our focus on excellence and variety, we aim to make your reading journey not just enjoyable but also deeply meaningful.
        </p>
        <p className="text-lg">
          For more information, click on the link below to learn more about us: 
          <a href="https://yt_pro_bookstore.com" className="text-blue-400 hover:underline"><b>Learn More...</b></a>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;


