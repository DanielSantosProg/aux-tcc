import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

const CustomAccordion = ({ items }) => {
  return (
    <Accordion collapseAll>
      {items.map((item, index) => (
        <AccordionPanel key={index}>
          <AccordionTitle className="bg-gray-100 border-b-1 border-gray-600">
            {item.title}
          </AccordionTitle>
          <AccordionContent>
            <p className="text-gray-500 dark:text-gray-500">{item.text}</p>
          </AccordionContent>
        </AccordionPanel>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
