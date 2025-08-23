import Image from 'next/image';

const Hero = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-0 h-fit relative xl:px-0">
      <div className="flex flex-col gap-4 md:gap-6 items-center xl:items-start xl:pr-4">
        <h1 className="font-lemon text-5xl md:text-6xl xl:text-8xl text-white leading-tight text-center xl:text-left">
          Blast Off and Explore Our Roadshow Destinations
        </h1>
        <h3 className="text-white xs:text-xs text-sm xl:text-2xl leading-relaxed text-center xl:text-left">
          Pilot the rocket, land on campuses, and unlock each destination as we reveal it. Our university roadshow is a cosmic quest for ideas, innovation, and discovery
        </h3>
      </div>
      
      {/* Desktop layout - absolute positioned */}
      <div className="hidden xl:block">
        <Image
          src="/images/rocks/path-test.svg"
          alt="Roadshow"
          width={800}
          height={800}
          className="absolute -right-8 top-0"
        />
      </div>
      
      {/* Mobile/Tablet layout - normal flow */}
      <div className="xl:hidden flex justify-center mt-8">
        <Image
          src="/images/rocks/path-test.svg"
          alt="Roadshow"
          width={1200}
          height={1200}
          className="w-full max-w-md md:max-w-lg h-auto"
        />
      </div>
    </div>
  )
}

export default Hero