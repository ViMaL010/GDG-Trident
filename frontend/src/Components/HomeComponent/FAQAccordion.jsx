import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';

export function FAQAccordion () {
  const [openQuestions, setOpenQuestions] = useState({
    'what': false,
    'who': false,
    'how': false
  });

  const toggleQuestion = (id) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqItems = [
    {
      id: 'what',
      question: 'What is this platform about?',
      answer: 'This platform connects students in need of financial support with donors who want to fund education. Students can create campaigns, and donors can contribute directly.'
    },
    {
      id: 'who',
      question: 'Who can use this platform?',
      answer: 'Students seeking financial aid for education and donors (individuals, organizations, or alumni) who wish to support students.'
    },
    {
      id: 'how',
      question: 'How do you ensure student authenticity?',
      answer: 'Students must undergo ID verification, academic document checks, and financial need assessment before their campaign is approved.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto border border-purple-200 rounded">
      {faqItems.map((item, index) => (
        <div key={item.id} className="border-b border-gray-200 last:border-b-0">
          <button
            onClick={() => toggleQuestion(item.id)}
            className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-800"
          >
            <span>{item.question}</span>
            <ChevronUp 
              className={`w-5 h-5 transition-transform ${openQuestions[item.id] ? '' : 'transform rotate-180'}`} 
            />
          </button>
          
          {openQuestions[item.id] && (
            <div className="px-4 pb-4">
              <p className="text-gray-600">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
