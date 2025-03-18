export function HowItWorks({ type }) {
  return (
    <div className="w-screen h-auto md:h-[521px] px-4 md:px-16 py-12 md:py-28 bg-black flex-col justify-start items-start gap-10 md:gap-20 inline-flex overflow-hidden">
      <div className="self-stretch flex-col md:flex-row justify-start items-start gap-10 md:gap-20 inline-flex">
        {/* Left Section */}
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex overflow-hidden">
          <div className="justify-start items-center inline-flex">
            <div className="text-white text-base font-semibold font-['Roboto'] leading-normal">
              For Students
            </div>
          </div>
          <div className="self-stretch text-white text-3xl md:text-5xl font-bold font-['Roboto'] leading-[40px] md:leading-[57.60px]">
            How It Works
          </div>
        </div>

        {/* Right Section */}
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-6 md:gap-8 inline-flex">
          <div className="self-stretch h-auto md:h-[217px] flex-col justify-start items-start gap-6 md:gap-8 flex">
            <div className="self-stretch text-white text-base md:text-lg font-normal font-['Roboto'] leading-[24px] md:leading-[27px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
            </div>
            <div className="self-stretch h-auto md:h-[104px] flex-col justify-start items-start gap-4 flex">
              {/* Step 1 */}
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                <div data-svg-wrapper>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.82 4.74671L13.7267 4.58004C13.6063 4.3785 13.4365 4.21099 13.2333 4.09337L8.76 1.51337C8.55746 1.39587 8.32753 1.33379 8.09333 1.33337H7.9C7.6658 1.33379 7.43586 1.39587 7.23333 1.51337L2.76 4.10004C2.55798 4.21688 2.39017 4.38469 2.27333 4.58671L2.18 4.75337C2.0625 4.95593 2.00041 5.18587 2 5.42004V10.5867C2.00041 10.8209 2.0625 11.0508 2.18 11.2534L2.27333 11.42C2.39319 11.6197 2.56033 11.7868 2.76 11.9067L7.24 14.4867C7.44153 14.6066 7.67213 14.6689 7.90666 14.6667H8.09333C8.32753 14.6663 8.55746 14.6042 8.76 14.4867L13.2333 11.9C13.4373 11.7858 13.6058 11.6174 13.72 11.4134L13.82 11.2467C13.9361 11.0436 13.9981 10.814 14 10.58V5.41337C13.9996 5.1792 13.9375 4.94927 13.82 4.74671ZM7.9 2.66671H8.09333L12 4.92004L8 7.22671L4 4.92004L7.9 2.66671ZM8.66666 13L12.5667 10.7467L12.6667 10.58V6.07337L8.66666 8.38671V13Z" fill="white" />
                  </svg>
                </div>
                <div className="grow shrink basis-0 text-white text-base font-normal font-['Roboto'] leading-normal">
                  Create Your Profile & Campaign
                </div>
              </div>

              {/* Step 2 */}
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                <div data-svg-wrapper>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.82 4.74671L13.7267 4.58004C13.6063 4.3785 13.4365 4.21099 13.2333 4.09337L8.76 1.51337C8.55746 1.39587 8.32753 1.33379 8.09333 1.33337H7.9C7.6658 1.33379 7.43586 1.39587 7.23333 1.51337L2.76 4.10004C2.55798 4.21688 2.39017 4.38469 2.27333 4.58671L2.18 4.75337C2.0625 4.95593 2.00041 5.18587 2 5.42004V10.5867C2.00041 10.8209 2.0625 11.0508 2.18 11.2534L2.27333 11.42C2.39319 11.6197 2.56033 11.7868 2.76 11.9067L7.24 14.4867C7.44153 14.6066 7.67213 14.6689 7.90666 14.6667H8.09333C8.32753 14.6663 8.55746 14.6042 8.76 14.4867L13.2333 11.9C13.4373 11.7858 13.6058 11.6174 13.72 11.4134L13.82 11.2467C13.9361 11.0436 13.9981 10.814 14 10.58V5.41337C13.9996 5.1792 13.9375 4.94927 13.82 4.74671ZM7.9 2.66671H8.09333L12 4.92004L8 7.22671L4 4.92004L7.9 2.66671ZM8.66666 13L12.5667 10.7467L12.6667 10.58V6.07337L8.66666 8.38671V13Z" fill="white" />
                  </svg>
                </div>
                <div className="grow shrink basis-0 text-white text-base font-normal font-['Roboto'] leading-normal">
                  Get Verified
                </div>
              </div>

              {/* Step 3 */}
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                <div data-svg-wrapper>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.82 4.74671L13.7267 4.58004C13.6063 4.3785 13.4365 4.21099 13.2333 4.09337L8.76 1.51337C8.55746 1.39587 8.32753 1.33379 8.09333 1.33337H7.9C7.6658 1.33379 7.43586 1.39587 7.23333 1.51337L2.76 4.10004C2.55798 4.21688 2.39017 4.38469 2.27333 4.58671L2.18 4.75337C2.0625 4.95593 2.00041 5.18587 2 5.42004V10.5867C2.00041 10.8209 2.0625 11.0508 2.18 11.2534L2.27333 11.42C2.39319 11.6197 2.56033 11.7868 2.76 11.9067L7.24 14.4867C7.44153 14.6066 7.67213 14.6689 7.90666 14.6667H8.09333C8.32753 14.6663 8.55746 14.6042 8.76 14.4867L13.2333 11.9C13.4373 11.7858 13.6058 11.6174 13.72 11.4134L13.82 11.2467C13.9361 11.0436 13.9981 10.814 14 10.58V5.41337C13.9996 5.1792 13.9375 4.94927 13.82 4.74671ZM7.9 2.66671H8.09333L12 4.92004L8 7.22671L4 4.92004L7.9 2.66671ZM8.66666 13L12.5667 10.7467L12.6667 10.58V6.07337L8.66666 8.38671V13Z" fill="white" />
                  </svg>
                </div>
                <div className="grow shrink basis-0 text-white text-base font-normal font-['Roboto'] leading-normal">
                  Receive Donations
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="justify-start items-center gap-4 md:gap-6 inline-flex">
            <button className="px-4 py-2 md:px-6 md:py-3 border border-white justify-center items-center gap-2 flex overflow-hidden cursor-pointer">
              <div className="text-white text-sm md:text-base font-normal font-['Roboto'] leading-normal">
                Start Campaign
              </div>
            </button>
            <div className="justify-center items-center gap-2 flex overflow-hidden">
              <div className="text-white text-sm md:text-base font-normal font-['Roboto'] leading-normal">
                Learn More
              </div>
              <div data-svg-wrapper>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.70697 16.9496L15.414 11.2426L9.70697 5.53564L8.29297 6.94964L12.586 11.2426L8.29297 15.5356L9.70697 16.9496Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}