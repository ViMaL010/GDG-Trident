export const Slider = () => {
    return <div>
        <div data-layer="Content" className="Content h-12 inline-flex justify-between items-center">
  <div data-layer="Slider Dots" className="SliderDots flex justify-start items-start gap-2">
    <div data-layer="Dot" className="Dot w-2 h-2 relative bg-black rounded-full" />
    <div data-layer="Dot" className="Dot w-2 h-2 relative bg-[#cccccc] rounded-full" />
    <div data-layer="Dot" className="Dot w-2 h-2 relative bg-[#cccccc] rounded-full" />
    <div data-layer="Dot" className="Dot w-2 h-2 relative bg-[#cccccc] rounded-full" />
    <div data-layer="Dot" className="Dot w-2 h-2 relative bg-[#cccccc] rounded-full" />
    <div data-layer="Dot" className="Dot w-2 h-2 relative bg-[#cccccc] rounded-full" />
  </div>
  <div data-layer="Slider Buttons" className="SliderButtons flex justify-start items-start gap-[15px]">
    <div data-layer="Button" className="Button p-3 rounded-[50px] border border-black flex justify-center items-center gap-2">
      <div data-layer="Icon" className="Icon w-6 h-6 flex justify-center items-center overflow-hidden">
        <div data-layer="Vector" className="Vector w-4 h-4 relative bg-black" />
      </div>
    </div>
    <div data-layer="Button" className="Button p-3 rounded-[50px] border border-black flex justify-center items-center gap-2">
      <div data-layer="Icon" className="Icon w-6 h-6 flex justify-center items-center overflow-hidden">
        <div data-layer="Vector" className="Vector w-4 h-4 relative bg-black" />
      </div>
    </div>
  </div>
</div>
    </div>
}