"use client"
import Path from "./Path"
import Planet from "./Planet"
import { useDestinationsContext } from "@/contexts/destinations"

const PathRenderer = () => {
  const { destinations } = useDestinationsContext()
  
  const planets = destinations.map((dest) => (
    <Planet
      key={dest.id}
      image={dest.image}
      status={dest.state}
      name={dest.state === "ongoing" ? dest.univ : undefined}
    />
  ))

  return <Path pathComponents={planets} />
}

export default PathRenderer