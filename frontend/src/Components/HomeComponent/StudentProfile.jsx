import { Slider } from "./Slider";

export function StudentProfile(){
    return <div className="mt-[80px]">
        <div className="h-[395px] w-[400px] bg-black">
        </div>
        <div className="mt-[24px] text-[20px] font-semibold">
            Aditi Sharma
        </div>
        <div>
            Computer Science, B.Tech
        </div>
        <div className="w-[400px] mt-[16px]">
        Aspiring software engineer passionate about AI and machine learning. Seeking support for tuition and research opportunities. 
        </div>
        <Slider/>
    </div>
}