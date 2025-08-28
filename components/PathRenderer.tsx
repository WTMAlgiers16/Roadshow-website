import Path from "./Path"
import { getSortedDestinations } from "@/data/destinations"
import Planet from "./Planet";


function getPlanets() {
  return getSortedDestinations().map((dest) => (
    <Planet
      key={dest.id}
      image={dest.image}
      status={dest.state}
      name={dest.state === "ongoing" ? dest.univ : undefined}
    />
  ));
}

const PathRenderer = () => {
    console.log(getPlanets())
  return (
    <Path pathComponents={getPlanets()}/>
  )
}

export default PathRenderer