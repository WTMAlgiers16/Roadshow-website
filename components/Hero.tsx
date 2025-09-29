import PathRenderer from "./PathRenderer";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-0 h-fit relative xl:px-0 mt-12">
      <div className="flex flex-col gap-4 md:gap-6 items-center xl:items-start xl:pr-4">
        <h1 className="font-lemon text-5xl md:text-6xl xl:text-[5rem] text-white leading-tight text-center xl:text-left">
          Blast Off and Explore Our Roadshow Destinations
        </h1>
        <h3 className="text-white xs:text-xs text-sm xl:text-2xl leading-relaxed text-center xl:text-left">
          Pilot the rocket, land on campuses, and unlock each destination as we reveal it. Our university roadshow is a cosmic quest for ideas, innovation, and discovery
        </h3>
      </div>

      {/* Desktop layout - absolute positioned */}
      <div className="hidden xl:block">
        <div className="absolute -right-8 top-0 w-[700px] h-fit">
          <PathRenderer />
        </div>      
      </div>
      
      {/* Mobile/Tablet layout - normal flow */}
      <div className="xl:hidden flex justify-center mt-8">
        <div className="max-w-md md:max-w-lg w-[1200px] h-fit">
          <PathRenderer />
        </div>
      </div>
    </div>
  )
}

export default Hero