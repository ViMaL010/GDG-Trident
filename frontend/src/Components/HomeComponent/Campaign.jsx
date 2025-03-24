import { useNavigate } from "react-router-dom";

export function Campaign() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="h-auto md:h-[804px] flex justify-start items-start">
        <div className="w-full flex justify-start items-start">
          <div className="w-full h-auto md:h-[700px] px-4 md:px-16 py-12 md:py-28 bg-white flex flex-col md:flex-row justify-start items-center gap-8 md:gap-20 overflow-hidden">
            <div className="w-full md:grow md:shrink md:basis-0 flex flex-col justify-start items-start gap-6 md:gap-8">
              <div className="w-full flex flex-col justify-start items-start gap-4 md:gap-6">
                <h1 className="text-black text-3xl md:text-[56px] font-bold font-['Roboto'] leading-tight md:leading-[67.20px]">
                  Connecting Students with Donors to Fund Education.
                </h1>
                <p className="text-black text-base md:text-lg font-normal font-['Roboto'] leading-relaxed md:leading-[27px]">
                  Students showcase their background and needs, while donors discover and support them directly—ensuring transparency and impact.
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-start items-start gap-4">
                <button className="w-full md:w-auto px-6 py-3 bg-black border border-black text-white text-base font-normal font-['Roboto'] leading-normal cursor-pointer" onClick={()=>{
                      const token = sessionStorage.getItem('token');
                      console.log(token);

                      if (token == null) {
                        navigate('/signup');
                      } else {
                        navigate('/dashboard');
                      }
                    }}>
                  Start Your Campaign
                </button>
                <button className="w-full md:w-auto px-6 py-3 border border-black text-black text-base font-normal font-['Roboto'] leading-normal cursor-pointer" onClick={()=>{
                      const token = sessionStorage.getItem('token');
                      console.log(token);

                      if (token == null) {
                        navigate('/signup');
                      } else {
                        navigate('/dashboard');
                      }
                    }}>
                  Support a Student
                </button>
              </div>
            </div>
            <div className="w-full md:grow md:shrink md:basis-0 flex justify-center items-center">
              <img
                className="w-full h-auto md:h-[640px] object-cover"
                src="https://cdn.prod.website-files.com/64c73d04a946980a4476537e/64cd4b9bf0da0e3228caa6d0_growth.png"
                alt="Campaign"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}