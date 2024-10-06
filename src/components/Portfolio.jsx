import React from 'react';

const PortfolioComponent = () => {
  // Path to your uploaded images (adjust according to your project setup)
  const images = [
    './pfp1.jpeg',
    './pfp2.jpeg',
    './pfp3.jpeg',
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg text-white">
  {/* Portfolio Introduction */}
  <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Discover Our Clients' Success Stories</h2>
        <p className="text-lg text-gray-600">
        Explore the diverse portfolios of our clients, each uniquely tailored to achieve their financial goals. Whether you're looking for stable growth, high-risk opportunities, or sector-specific investments, our expertly crafted portfolios offer something for every investor.
        </p>
      </div>



      {/* Image Gallery */}
      <h3 className="text-2xl font-bold mb-4">Portfolio Gallery</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {images.map((image, index) => (
          <div key={index} className="relative bg-white rounded-lg ">
            <img
              src={image}
              alt={`Portfolio ${index + 1}`}
              className="rounded-lg w-full h-full object-fit transition duration-300 transform hover:scale-105"
            />
          </div>
        ))}
      </div>

  
     
    </div>
  );
};

export default PortfolioComponent;
