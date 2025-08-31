import { HoverCard, HoverCardTrigger, HoverCardContent } from "@radix-ui/react-hover-card";
import Image from "next/image";

interface PlanetProps {
  image: string;
  status: "upcoming" | "ongoing" | "finished";
  name?: string;
  universityImage: string;
}

const Planet = ({ image, status, name, universityImage }: PlanetProps) => {
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
          <div className="relative bg-white text-black font-semibold text-sm px-2 py-2 rounded-lg">
            We&apos;re at {name}!
          </div>
        </div>
      );
    }

    return null; // finished → no dialog
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Dialog */}
      {renderDialog()}

      {/* Planet */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Image
            src={image}
            alt="planet"
            width={160}
            height={160}
            className={status === "upcoming" ? "brightness-50" : ""}
          />
        </HoverCardTrigger>
        <HoverCardContent className="grid gap-2 w-48 text-center bg-white text-black p-4 rounded-lg shadow-lg">
          {status === "upcoming" ? (
            <p className="text-sm text-gray-500">Revealed soon</p>
          ) : (
            <>
              <div className="flex justify-center">
                <Image
                  src={universityImage}
                  alt="university logo"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-base text-gray-700font-semibold">
                  {status === "ongoing" ? "Ongoing now" : "Visited"}
                </p>
              </div>
            </>
          )}
        </HoverCardContent>
      </HoverCard>

      {/* Rocket only on current */}
      {status === "ongoing" && (
        <Image
          src="images/rocket.svg"
          alt="rocket"
          width={128}
          height={128}
          className="absolute -top-10 left-0 translate-x-1/2"
        />
      )}
    </div>
  );
};

export default Planet;
