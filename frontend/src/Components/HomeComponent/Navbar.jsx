import { useNavigate } from 'react-router-dom';

export function Navbar() {
  
  const navigate = useNavigate();
  return (
    <div className="h-[72px] flex-col justify-start items-start inline-flex">
      <div className="flex-col w-full justify-start items-start flex">
        <div className="w-screen h-[72px] px-4 md:px-16 bg-white border-b border-black flex-col justify-center items-center flex">
          <div className="self-stretch justify-between items-center inline-flex">
            <div data-svg-wrapper>
              <img src="/Logo.png" className='h-8' alt="" />
            </div>
            <div className="justify-center items-center gap-4 md:gap-8 flex">
              <div className="hidden md:flex justify-end items-center gap-4 md:gap-8">
                <div className="justify-center items-center gap-1 flex">
                  <div className="text-black text-base font-normal font-['Roboto'] leading-normal cursor-pointer"  onClick={()=>{
                    navigate('/home')
                  }}>
                    Home
                  </div>
                </div>
                <div className="justify-center items-center gap-1 flex">
                  <div className="text-black text-base font-normal font-['Roboto'] leading-normal cursor-pointer">
                    About Us
                  </div>
                </div>
                <div className="justify-center items-center gap-1 flex">
                  <div className="text-black text-base font-normal font-['Roboto'] leading-normal cursor-pointer">
                    Browse Students
                  </div>
                </div>
                <div className="justify-center items-center gap-1 flex">
                  <div className="justify-start items-center gap-1 flex">
                    <div className="text-black text-base font-normal font-['Roboto'] leading-normal cursor-pointer" onClick={()=>{
                      const token = sessionStorage.getItem('token');
                      console.log(token);

                      if (token == null) {
                        navigate('/signup');
                      } else {
                        navigate('/dashboard');
                      }
                    }}>
                      Start a Campaign
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-center items-center gap-2 md:gap-4 flex">
                <div className="px-3 py-1 md:px-5 md:py-2 border border-black justify-center items-center gap-2 flex cursor-pointer " onClick={() => navigate('/signup')} >
                  <div className="text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal " >
                    Register
                  </div>
                </div>
                <div className="px-3 py-1 md:px-5 md:py-2 bg-black border border-black justify-center items-center gap-2 flex cursor-pointer"  onClick={() => navigate('/login')}>
                  <button className="text-white text-sm md:text-base font-normal font-['Roboto'] leading-normal">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}