


"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import RecapDialog from "./event-recap"
import { useDestinationsContext } from "@/contexts/destinations"

export default function CardGrid() {
  const { currentDestination, pastDestinations, futureDestinations } = useDestinationsContext()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDestId, setSelectedDestId] = useState<number | null>(null)

  const selectedDest =
    selectedDestId !== null
      ? [...pastDestinations, ...futureDestinations, currentDestination].find(
          (d) => d && d.id === selectedDestId
        ) || null
      : null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-30">
        {/* Current destination big card */}
        {currentDestination ? (
          <Card className="md:col-span-3 sm:col-span-2 bg-[1D0C2E]/30 p-6 rounded-lg border-2 text-white">
            <CardHeader className="flex justify-between">
              <h3 className="text-3xl md:text-5xl font-bold font-lemon tracking-widest">
                {currentDestination.univ}
              </h3>
              <Image
                src={currentDestination.image}
                alt={currentDestination.univ}
                width={0}
                height={0}
                className="float-planet md:w-[100px] w-[80px] md:h-[100px] h-[80px]"
              />
            </CardHeader>
            <CardContent className="grid gap-6 ">
              <div className="md:flex grid justify-between gap-6 text-sm md:text-base">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/icons/calendar.svg"
                    alt="calendar"
                    width={0}
                    height={0}
                    className="w-5 sm:w-6 md:w-6"
                  />
                  <p className="text-base md:text-xl font-montserrat">
                    {new Date(currentDestination.startTime).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 items-center text-sm md:text-base">
                  <Image
                    src="/icons/clock.svg"
                    alt="clock"
                    width={0}
                    height={0}
                    className="w-5 sm:w-6 md:w-6"
                  />
                  <p className="text-base md:text-xl font-montserrat">
                    {new Date(currentDestination.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(currentDestination.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex gap-2 items-center text-sm md:text-base">
                  <Image
                    src="/icons/map-icon.svg"
                    alt="location"
                    width={0}
                    height={0}
                    className="w-6 sm:w-7 md:w-7"
                  />
                  <p className="text-base md:text-xl font-montserrat">
                    {currentDestination.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="md:col-span-3 bg-[1D0C2E]/30 p-6 rounded-lg border-2 text-white grid place-items-center">
            <h3 className="text-xl font-bold">No destination revealed yet</h3>
          </Card>
        )}

        {/* Past destinations (recap available) */}
        {pastDestinations.map((dest) => (
          <Card
            key={dest.id}
            onClick={() => {
              setSelectedDestId(dest.id)
              setDialogOpen(true)
            }}
            className="bg-[1D0C2E]/30 px-6 py-8 rounded-lg border-2 text-white grid justify-center items-center cursor-pointer hover:scale-105 transition"
          >
            <CardContent className="grid items-center justify-items-center gap-4">
              <Image
                src={dest.image}
                alt={dest.univ}
                width={90}
                height={90}
                className="float-planet"
              />
              <h3 className="text-4xl font-bold text-center font-lemon tracking-widest">
                {dest.univ}
              </h3>
              <p className="text-[var(--secondary-text)] text-xl font-montserrat">
                {dest.location}
              </p>
            </CardContent>
          </Card>
        ))}

        {/* Future destinations (locked) */}
        {futureDestinations.map((dest) => (
          <Card
            key={dest.id}
            className="bg-[1D0C2E]/30 p-6 rounded-lg border-2 text-white grid justify-center items-center"
          >
            <CardContent className="grid items-center justify-items-center gap-4">
              <div className="p-4 border-2 border-white rounded-full bg-[#D9D9D9]/30">
                <Image src="/icons/faq.svg" alt="locked" width={50} height={50} />
              </div>
              <h3 className="text-4xl font-bold font-lemon tracking-widest">
                Mystery Planet
              </h3>
              <p className="text-[var(--secondary-text)] text-xl font-montserrat">
                Revealed soon
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recap dialog */}
      <RecapDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        destination={selectedDest}
      />
    </>
  )
}
