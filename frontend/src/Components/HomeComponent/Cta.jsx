export function Cta() {
    return (
      <div>
        <div
          data-layer="CTA section"
          data-breakpoint="Desktop"
          className="CtaSection w-full h-auto md:h-[398px] px-4 md:px-16 py-12 md:py-28 bg-black/95 inline-flex flex-col justify-start items-start gap-10 md:gap-20 overflow-hidden"
        >
          <div
            data-layer="Content"
            className="Content self-stretch flex-col md:flex-row justify-start items-start gap-10 md:gap-20 inline-flex"
          >
            {/* Left Column */}
            <div
              data-layer="Column"
              className="Column grow shrink basis-0 inline-flex flex-col justify-start items-start gap-4"
            >
              <div
                data-layer="Tagline Wrapper"
                className="TaglineWrapper self-stretch inline-flex justify-start items-center"
              >
                <div
                  data-layer="Tagline"
                  className="Tagline relative justify-start text-white text-base font-semibold font-['Roboto'] leading-normal"
                >
                  Tagline
                </div>
              </div>
              <div
                data-layer="Short heading here"
                className="ShortHeadingHere relative justify-start text-white text-3xl md:text-[56px] font-bold font-['Roboto'] leading-[40px] md:leading-[67.20px]"
              >
                Empower Education, Transform Future
              </div>
            </div>
  
            {/* Right Column */}
            <div
              data-layer="Column"
              className="Column grow shrink basis-0 inline-flex flex-col justify-start items-start gap-6 md:gap-8"
            >
              <div
                data-layer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                className="LoremIpsumDolorSitAmetConsecteturAdipiscingElitSuspendisseVariusEnimInErosElementumTristiqueDuisCursusMiQuisViverraOrnareErosDolorInterdumNullaUtCommodoDiamLiberoVitaeErat relative justify-start text-white text-base md:text-lg font-normal font-['Roboto'] leading-[24px] md:leading-[27px]"
              >
                Students reach their potential. Donors create lasting impact. Together, we build brighter futures.
              </div>
              <div
                data-layer="Actions"
                className="Actions flex-col md:flex-row justify-start items-start gap-4 inline-flex"
              >
                <div
                  data-layer="Button"
                  data-alternate="True"
                  data-icon
                  position="No icon"
                  data-small="False"
                  data-style="Primary"
                  className="Button px-4 py-2 md:px-6 md:py-3 bg-white border border-white flex justify-center items-center gap-2"
                >
                  <div
                    data-layer="Button"
                    className="Button relative justify-start text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal"
                  >
                    Join as a student
                  </div>
                </div>
                <div
                  data-layer="Button"
                  data-alternate="True"
                  data-icon
                  position="No icon"
                  data-small="False"
                  data-style="Secondary"
                  className="Button px-4 py-2 md:px-6 md:py-3 border border-white flex justify-center items-center gap-2"
                >
                  <div
                    data-layer="Button"
                    className="Button relative justify-start text-white text-sm md:text-base font-normal font-['Roboto'] leading-normal"
                  >
                    Support a student
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }