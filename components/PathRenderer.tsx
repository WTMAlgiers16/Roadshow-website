"use client"
import Path from "./Path"
import Planet from "./Planet"
import { useDestinationsContext } from "@/contexts/destinations"

const PathRenderer = () => {
  const { destinations, currentDestination } = useDestinationsContext()

  const planets = destinations.map((dest) => {
    let status: "upcoming" | "ongoing" | "finished" = "upcoming"

    if (dest.revealStatus === "revealed") {
      if (dest.id === currentDestination?.id) {
        status = "ongoing"   // current one
      } else {
        status = "finished"  // already revealed but not current
      }
    } 
    else if (dest.revealStatus === "recap-available") {
      status = "finished"    // also counts as past
    }

    return (
      <Planet
        key={dest.id}
        image={dest.image}
        universityImage={dest.universityImage}
        status={status}
        name={status === "ongoing" ? dest.univ : undefined}
      />
    )
  })

  return <Path pathComponents={planets} />
}

export default PathRenderer
