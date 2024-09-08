import React, { useState } from 'react';

function Card(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (event) => {
    // Check if the click target is the button
    if (event.target.tagName !== 'BUTTON') {
      setIsFlipped(!isFlipped);
    }
  };

  const handleButtonClick = () => {
    // Perform the action when the button is clicked
    alert("Button Clicked!");
  };

  const frontContent = (
    <div className="p-6 w-auto">
      <h2 className="text-3xl font-semibold mb-4">{props.title}</h2>
      <p className="text-4xl font-bold mb-6">{props.price}</p>
      <ul className="mb-6">
        {props.features.map((feature, index) => (
          <li key={index} className="mb-2 flex items-center">
            <span className='text-bold text-lg'>{feature.text}</span>
            <img src={feature.icon} className="h-6 ml-auto" alt="Feature Icon" />
          </li>
        ))}
      </ul>
      {/* Add onClick event handler to the button */}
      <button onClick={handleButtonClick} className="bg-green-600 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 text-center">{props.buttonText}</button>
    </div>
  );

  const backContent = (
    <div className="p-6 text-center w-72 h-72">
      {/* Use the back content passed as prop */}
      {props.backContent}
    </div>
  );

  const cardContent = isFlipped ? backContent : frontContent;

  return (
    <div
      className={`mt-8 w-72 bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 text-blue-900 cursor-pointer`}
      onClick={handleClick}
    >
      {cardContent}
    </div>
  );
}

export default Card;
