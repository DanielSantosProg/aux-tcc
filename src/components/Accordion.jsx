import React from 'react';

const Accordion = ({ items }) => {
  return (
    <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white text-gray-900" data-inactive-classes="text-gray-500">
      {items.map((item, index) => (
        <div key={index}>
          <h2 id={`accordion-flush-heading-${index}`}>
            <button
              type="button"
              className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 gap-3"
              data-accordion-target={`#accordion-flush-body-${index}`}
              aria-expanded="false"
              aria-controls={`accordion-flush-body-${index}`}
            >
              <span>{item.title}</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id={`accordion-flush-body-${index}`} className="hidden" aria-labelledby={`accordion-flush-heading-${index}`}>
            <div className="py-5 border-b border-gray-200 ">
              <p className="text-gray-500">{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
