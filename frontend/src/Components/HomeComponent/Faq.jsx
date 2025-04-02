import { FAQAccordion } from "./FAQAccordion";

export function Faq() {
  return (
    <div>
      <div
        data-layer="FAQ / 2 /"
        data-breakpoint="Desktop"
        className="Faq2 w-full min-h-[400px] px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-28 bg-white flex flex-col items-center justify-center overflow-hidden"
      >
        <div
          data-layer="Section Title"
          className="SectionTitle flex flex-col items-center justify-start gap-4 sm:gap-6 w-full max-w-4xl"
        >
          <div
            data-layer="FAQs"
            className="Faqs text-center text-black text-3xl sm:text-4xl md:text-5xl font-bold font-['Roboto'] leading-tight md:leading-[57.60px]"
          >
            FAQs
          </div>
          <div
            data-layer="Text"
            className="Text text-center text-black text-base sm:text-lg font-normal font-['Roboto'] leading-normal sm:leading-[27px] mb-4 sm:mb-8 px-4"
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