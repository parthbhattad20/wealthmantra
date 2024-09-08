import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqsData = [
        {
            question: "What is WealthMantra, and who is it for?",
            answer: "WealthMantra is a stock market channel designed for both beginners and experienced investors. We provide expert insights, stock analysis, investment strategies, and educational content to help you make informed decisions and grow your wealth.",
        },
        {
            question: "What kind of content can I expect from WealthMantra? ",
            answer: "WealthMantra covers a wide range of topics, including in-depth stock analysis, market trends, investment strategies, and educational content on financial concepts. Our goal is to equip you with the tools and knowledge needed to succeed in the stock market.",
        },
        {
            question: "How often is new content published on WealthMantra?",
            answer: "We regularly update the channel with new insights and analysis, typically publishing fresh content multiple times a week to keep you informed of market trends and investment opportunities.",
        },
        {
            question:
                "Is WealthMantra suitable for beginners in the stock market?",
            answer: "Absolutely! We cater to both beginners and seasoned investors. Our educational content is designed to break down complex concepts into easy-to-understand guides, helping newcomers build a strong foundation in investing.",
        },
        {
            question: "Can I interact with the community and ask questions? ",
            answer: "Yes! WealthMantra encourages community engagement. You can join discussions, ask questions, and participate in live sessions where we dive into specific market topics and investment strategies.",
        },
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div
            name="faqs"
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 mb-20"
            style={{ width: "80%" }}
        >
            <h1 className="text-4xl font-bold mb-10 mt-20 text-gray-900 uppercase text-center">
                FAQs
            </h1>
            {faqsData.map((faq, index) => (
                <div
                    key={index}
                    className="border p-4 mb-4 rounded-lg transition ease-in-out duration-300 transform hover:shadow-md"
                >
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleFAQ(index)}
                    >
                        <h2 className="text-lg font-medium">{faq.question}</h2>
                        <button className="text-gray-500 focus:outline-none">
                            {activeIndex === index ? <FaMinus /> : <FaPlus />}
                        </button>
                    </div>
                    <div
                        className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                            activeIndex === index
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0"
                        }`}
                        style={{ transitionProperty: "max-height, opacity" }}
                    >
                        <p className="mt-2">{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQs;
