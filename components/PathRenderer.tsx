"use client"
import Path from "./Path"
import Planet from "./Planet"
import { useDestinationsContext } from "@/contexts/destinations"

const PathRenderer = () => {
  const { destinations, currentDestination } = useDestinationsContext()

  const planets = destinations.map((dest) => {
    return (
      <Planet
        key={dest.id}
        image={dest.image}
        universityImage={dest.universityImage}
        status={dest.state}
        name={dest.state === "ongoing" ? dest.univ : undefined}
      />
    )
  })

  return <Path pathComponents={planets} />
}

export default PathRenderer
