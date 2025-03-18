import {FAQAccordion} from "./FAQAccordion";

export function Faq() {
    return (
      <div>
        <div 
          data-layer="FAQ / 2 /" 
          data-breakpoint="Desktop" 
          className="Faq2 w-full h-[720px] px-16 py-28 bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          <div 
            data-layer="Section Title" 
            className="SectionTitle flex flex-col items-center justify-start gap-6 max-w-4xl"
          >
            <div 
              data-layer="FAQs" 
              className="Faqs text-center text-black text-5xl font-bold font-['Roboto'] leading-[57.60px]"
            >
              FAQs
            </div>
            <div 
              data-layer="Text" 
              className="Text text-center text-black text-lg font-normal font-['Roboto'] leading-[27px] mb-8"
            >
              Find answers to common questions about our platform, student funding, and donor contributions. 
              If you need further assistance, feel free to contact us.
            </div>
            <FAQAccordion />
          </div>
        </div>
      </div>
    );
  }