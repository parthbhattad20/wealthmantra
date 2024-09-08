import React, { useState } from 'react';
import ModalComponent from '../components/CalculatorsModel'
import Navbar from '../components/HomeNav';
import Footer from '../components/Footer';


function CalculatorCard() {
  const [isVisible, setIsVisible] = useState(false);
  const [calculatorType, setCalculatorType] = useState(null);
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  const handleOpenModal = (type) => {
    setCalculatorType(type);
    setInputs({});
    setResult(null);
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleCalculate = () => {
    let calcResult = 0;

    // 1. Position Sizing Calculator Logic
    if (calculatorType === 'Position_Sizing') {
      const { accountRisk, accountSize, tradeRisk } = inputs;
      calcResult = (accountRisk * accountSize) / tradeRisk;
      calcResult = calcResult.toFixed(2);

    // 2. Lumpsum Future Value Calculator Logic
    } else if (calculatorType === 'Lumpsum_FV') {
      const { presentValue, rate, years } = inputs;
      const r = rate / 100;
      const t = years;
      calcResult = presentValue * (1 + r) ** t;
      calcResult = calcResult.toFixed(2);

    // 3. Goal Lumpsum Calculator Logic
    } else if (calculatorType === 'Goal_Lumpsum') {
      const { goalAmount, rate, years } = inputs;
      const r = rate / 100;
      const t = years;
      calcResult = goalAmount / (1 + r) ** t;
      calcResult = calcResult.toFixed(2);

    // 4. CAGR (Compound Annual Growth Rate) Calculator Logic
    } else if (calculatorType === 'CAGR') {
      const { initialValue, finalValue, years } = inputs;
      calcResult = ((finalValue / initialValue) ** (1 / years) - 1) * 100;
      calcResult = calcResult.toFixed(2);

    // 5. SIP (Systematic Investment Plan) Calculator Logic
    } else if (calculatorType === 'SIP') {
      const { monthlyInvestment, rate, years } = inputs;
      const n = years * 12;
      const r = rate / 100 / 12;
      calcResult = monthlyInvestment * (((1 + r) ** n - 1) / r) * (1 + r);
      calcResult = calcResult.toFixed(2);

    // 6. Goal SIP Calculator Logic
    } else if (calculatorType === 'Goal_SIP') {
      const { goalAmount, rate, years } = inputs;
      const n = years * 12;
      const r = rate / 100 / 12;
      calcResult = goalAmount / (((1 + r) ** n - 1) / r) * (1 + r);
      calcResult = calcResult.toFixed(2);
    }

    setResult(calcResult);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white mb-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 mt-10">Financial Calculators</h1>

      {/* Calculator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
        {/* Position Sizing Calculator */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleOpenModal('Position_Sizing')}
        >
          <img src='https://d502jbuhuh9wk.cloudfront.net/orgData/5df0bac8e4b0947308291487/pages/assets/images/rdTdNgoalsipcalculator.png' alt='psc'/>
          <h2 className="text-xl font-semibold text-center">Position Sizing Calculator</h2>
          <p className="text-center mt-2">Calculate how much your position size should be</p>
        </div>

        {/* Lumpsum Future Value Calculator */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleOpenModal('Lumpsum_FV')}
        >
           <img src='https://d502jbuhuh9wk.cloudfront.net/orgData/5df0bac8e4b0947308291487/pages/assets/images/AGxM1lumpsumcalculator02.png' alt='cagr pic'/>
          <h2 className="text-xl font-semibold text-center">Lumpsum FV Calculator</h2>
          <p className="text-center mt-2">Calculate the future value of present amount</p>
        </div>

        {/* Goal Lumpsum Calculator */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleOpenModal('Goal_Lumpsum')}
        >
         <img src='https://d502jbuhuh9wk.cloudfront.net/orgData/5df0bac8e4b0947308291487/pages/assets/images/Hg9M9agxm1lumpsumcalculator02.png' alt='cagr pic'/>
          <h2 className="text-xl font-semibold text-center">Goal Lumpsum Calculator</h2>
          <p className="text-center mt-2">Calculate how much amount you require today for your future goal</p>
        </div>

        {/* CAGR Calculator */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleOpenModal('CAGR')}
        >
          <img src='https://d502jbuhuh9wk.cloudfront.net/orgData/5df0bac8e4b0947308291487/pages/assets/images/l2Yflcagrchalculator.png' alt='cagr pic'/>
          <h2 className="text-xl font-semibold text-center">CAGR Calculator</h2>
          <p className="text-center mt-2">Calculate Compound Annual Growth Rate</p>
        </div>

        {/* SIP Calculator */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleOpenModal('SIP')}
        >
          <img src='https://d502jbuhuh9wk.cloudfront.net/orgData/5df0bac8e4b0947308291487/pages/assets/images/Ed1CSsipchalculator02.png' alt='cagr pic'/>
          <h2 className="text-xl font-semibold text-center">SIP Calculator</h2>
          <p className="text-center mt-2">Calculate returns from your monthly investments</p>
        </div>

        {/* Goal SIP Calculator */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleOpenModal('Goal_SIP')}
        >
          <img src='https://d502jbuhuh9wk.cloudfront.net/orgData/5df0bac8e4b0947308291487/pages/assets/images/IO2gHgoallumsumcalculatur.png' alt='cagr pic'/>
          <h2 className="text-xl font-semibold text-center">Goal SIP Calculator</h2>
          <p className="text-center mt-2">Calculate monthly investment needed to achieve a goal</p>
        </div>
      </div>

      {/* Modal Component */}
      <ModalComponent
        isVisible={isVisible}
        onClose={handleCloseModal}
        onCalculate={handleCalculate}
        inputs={inputs}
        handleInputChange={handleInputChange}
      >
        {/* Inputs based on calculator type */}
        {calculatorType === 'Position_Sizing' && (
          <>
            <input
              type="number"
              name="accountRisk"
              placeholder="Account Risk (%)"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="accountSize"
              placeholder="Account Size"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="tradeRisk"
              placeholder="Trade Risk (in amount)"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        )}

        {calculatorType === 'Lumpsum_FV' && (
          <>
            <input
              type="number"
              name="presentValue"
              placeholder="Present Value (Lumpsum)"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="rate"
              placeholder="Rate of Return (%)"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="years"
              placeholder="Number of Years"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        )}

        {calculatorType === 'Goal_Lumpsum' && (
          <>
            <input
              type="number"
              name="goalAmount"
              placeholder="Goal Amount"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="rate"
              placeholder="Rate of Return (%)"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="years"
              placeholder="Number of Years"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        )}

        {calculatorType === 'SIP' && (
          <>
            <input
              type="number"
              name="monthlyInvestment"
              placeholder="Monthly Investment"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="rate"
              placeholder="Rate of Return (%)"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="years"
              placeholder="Number of Years"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        )}

        {calculatorType === 'Goal_SIP' && (
          <>
            <input
              type="number"
              name="goalAmount"
              placeholder="Goal Amount"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="rate"
              placeholder="Rate of Return (%)"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="years"
              placeholder="Number of Years"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        )}
   
        {calculatorType === 'CAGR' && (
          <>
            <input
              type="number"
              name="initialValue"
              placeholder="Initial Value"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="finalValue"
              placeholder="Final Value"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="years"
              placeholder="Number of Years"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        )}


        {/* Show Result */}
        {result && (
          <div className="mt-4 bg-green-100 text-green-800 p-3 rounded">
            <p className="text-center text-lg font-semibold">Result: {result}</p>
          </div>
        )}
      </ModalComponent>
    </div>
    <Footer/>
    </>
  );
}

export default CalculatorCard;
