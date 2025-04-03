export function Footer() {
  return (
    <div>
      <hr />
      <div 
        data-layer="Footer / 7 /" 
        className="w-full bg-black px-4 py-8 md:px-8 lg:px-16 md:py-10 flex flex-col justify-start items-center gap-8 md:gap-12 lg:gap-20 overflow-hidden"
      >
        <div data-layer="Content" className="w-full flex flex-col justify-start items-center gap-6 md:gap-8">
          <div data-layer="Logo" className="flex flex-col justify-start items-start gap-4 md:gap-6 overflow-hidden">
            <div 
              data-layer="Company Logo" 
              data-color="Dark" 
              className="w-[84px] h-9 inline-flex justify-center items-center overflow-hidden"
            >
              <img src="/Logo.png" alt="Company logo" />
            </div>
          </div>
          
          <div data-layer="Links" className="w-full flex flex-wrap justify-center items-start gap-4 md:gap-8">
            <div data-layer="Link One" className="relative text-white text-sm font-semibold font-['Roboto'] leading-[21px] px-2 py-1">Home</div>
            <div data-layer="Link Two" className="relative text-white text-sm font-semibold font-['Roboto'] leading-[21px] px-2 py-1">About Us</div>
            <div data-layer="Link Three" className="relative text-white text-sm font-semibold font-['Roboto'] leading-[21px] px-2 py-1">Browse Students</div>
            <div data-layer="Link Four" className="relative text-white text-sm font-semibold font-['Roboto'] leading-[21px] px-2 py-1">Start a Campaign</div>
          </div>
        </div>
        
        <div data-layer="Credits" className="w-full flex flex-col justify-start items-center gap-4 md:gap-8">
          <div data-layer="Row" className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-0">
            <div 
              data-layer="© 2024 Relume. All rights reserved." 
              className="relative text-white text-sm font-normal font-['Roboto'] leading-[21px] text-center md:text-left"
            >
              © All rights reserved.
            </div>
            
            <div data-layer="Footer Links" className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6">
              <div data-layer="Privacy Policy" className="relative text-white text-sm font-normal font-['Roboto'] underline leading-[21px] px-1">Privacy Policy</div>
              <div data-layer="Terms of Service" className="relative text-white text-sm font-normal font-['Roboto'] underline leading-[21px] px-1">Terms of Service</div>
              <div data-layer="Cookies Settings" className="relative text-white text-sm font-normal font-['Roboto'] underline leading-[21px] px-1">Cookies Settings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}