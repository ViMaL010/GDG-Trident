export function WhyChooseUs() {
  return (
    <div>
      <div 
        data-layer="Comparison / 9 /" 
        data-breakpoint="Desktop" 
        className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-20 lg:py-28 bg-white flex flex-col justify-start items-center gap-8 md:gap-12 lg:gap-20 overflow-hidden"
      >
        <div 
          data-layer="Section Title" 
          className="w-full flex flex-col justify-start items-center gap-4"
        >
          <div 
            data-layer="Tagline Wrapper" 
            className="inline-flex justify-start items-center"
          >
            <div 
              data-layer="Tagline" 
              className="relative text-center justify-start"
            ></div>
          </div>
          <div 
            data-layer="Content" 
            className="self-stretch flex flex-col justify-start items-center gap-4 md:gap-6"
          >
            <div 
              data-layer="Heading" 
              className="relative text-center justify-start text-black text-3xl md:text-4xl lg:text-5xl font-bold font-['Roboto'] leading-tight md:leading-[57.60px]"
            >
              Why Choose Us?
            </div>
            <div 
              data-layer="Text" 
              className="relative text-center justify-start text-black text-base md:text-lg font-normal font-['Roboto'] leading-relaxed md:leading-[27px] px-2"
            >
              Empowering dreams, ensuring transparency, and making a real impact.
            </div>
          </div>
        </div>
        
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 md:p-4 text-left font-bold text-gray-800 border-b border-r">Features</th>
                <th className="p-3 md:p-4 text-center font-bold text-gray-800 border-b border-r">
                  <div className="flex justify-center items-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 mr-1 md:mr-2" fill="currentColor">
                      <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z" />
                    </svg>
                    <span className="text-sm md:text-base">Our platform</span>
                  </div>
                </th>
                <th className="p-3 md:p-4 text-center font-bold text-gray-800 border-b">
                  <div className="flex justify-center items-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 mr-1 md:mr-2" fill="currentColor">
                      <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z" />
                    </svg>
                    <span className="text-sm md:text-base">Other platforms</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 md:p-4 border-b border-r text-sm md:text-base">Student Campaigns</td>
                <td className="p-3 md:p-4 text-center border-b border-r">
                  <span className="text-green-600 text-lg md:text-xl">✓</span>
                </td>
                <td className="p-3 md:p-4 text-center border-b">
                  <span className="text-red-600 text-lg md:text-xl">✗</span>
                </td>
              </tr>
              <tr>
                <td className="p-3 md:p-4 border-b border-r text-sm md:text-base">Verified Profiles</td>
                <td className="p-3 md:p-4 text-center border-b border-r">
                  <span className="text-green-600 text-lg md:text-xl">✓</span>
                </td>
                <td className="p-3 md:p-4 text-center border-b">
                  <span className="text-green-600 text-lg md:text-xl">✓</span>
                </td>
              </tr>
              <tr>
                <td className="p-3 md:p-4 border-b border-r text-sm md:text-base">Zero Platform Fees</td>
                <td className="p-3 md:p-4 text-center border-b border-r">
                  <span className="text-green-600 text-lg md:text-xl">✓</span>
                </td>
                <td className="p-3 md:p-4 text-center border-b">
                  <span className="text-red-600 text-lg md:text-xl">✗</span>
                </td>
              </tr>
              <tr>
                <td className="p-3 md:p-4 border-b border-r text-sm md:text-base">Transparent Fund Tracking</td>
                <td className="p-3 md:p-4 text-center border-b border-r">
                  <span className="text-green-600 text-lg md:text-xl">✓</span>
                </td>
                <td className="p-3 md:p-4 text-center border-b">
                  <span className="text-red-600 text-lg md:text-xl">✗</span>
                </td>
              </tr>
              <tr>
                <td className="p-3 md:p-4 border-b border-r text-sm md:text-base">AI-Driven Matching</td>
                <td className="p-3 md:p-4 text-center border-b border-r">
                  <span className="text-green-600 text-lg md:text-xl">✓</span>
                </td>
                <td className="p-3 md:p-4 text-center border-b">
                  <span className="text-red-600 text-lg md:text-xl">✗</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}