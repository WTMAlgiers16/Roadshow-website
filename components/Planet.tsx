import Image from "next/image";

interface PlanetProps {
  image: string;
  status: "upcoming" | "ongoing" | "finished";
  name?: string; // destination name when ongoing
}

const Planet = ({ image, status, name }: PlanetProps) => {
const renderDialog = () => {
  if (status === "upcoming") {
    return (
      <div className="absolute -top-10 flex flex-col items-center">
        <div className="relative bg-white text-black text-sm px-4 py-2 rounded-lg">
          ???
        </div>
      </div>
    );
  }

  if (status === "ongoing") {
    return (
      <div className="absolute -top-20 flex flex-col items-center">
        <div className="relative bg-white text-black font-semibold text-sm px-4 py-2 rounded-lg">
          We&apos;re at {name} ! 
        </div>
      </div>
    );
  }

  return null;
};

  return (
    <div className="relative flex items-center justify-center">
      {/* Dialog */}
      {renderDialog()}

      {/* Planet */}
        <Image
          src={image}
          alt="planet"
          width={160}
          height={160}
          className={`${
            status === "upcoming" ? "brightness-30" : ""
          }`}
        />

        {/* Rocket sitting on planet  */}
        {status === "ongoing" && (
          <Image
            src="images/rocket.svg"
            alt="rocket"
            width={128}
            height={128}
            className="absolute -top-10 left-0 translate-x-1/2 "
          />
        )}
      {/* </div> */}
    </div>
  );
};

export default Planet;
