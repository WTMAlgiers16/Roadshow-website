"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import RecapDialog from "./event-recap"
import { destinations } from "@/data/destinations"
import { useDestinationsData } from "@/hooks/useDestinationsData"

export default function CardGrid() {
  const [now, setNow] = useState(new Date())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDestId, setSelectedDestId] = useState<number | null>(null)

  const firestoreData = useDestinationsData()

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const merged = destinations.map((d) => ({
    ...d,
    attendees: firestoreData[d.id]?.attendees ?? d.attendees,
    images: firestoreData[d.id]?.images ?? d.images,
  }))

  const revealed = merged.filter((d) => new Date(d.revealTime) <= now)
  const current = revealed[revealed.length - 1] || null
  const past = revealed.slice(0, -1)
  const future = merged.filter((d) => new Date(d.revealTime) > now)

  const selectedDest =
    selectedDestId !== null ? merged.find((d) => d.id === selectedDestId) || null : null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-30">
        {/* Current destination big card */}
        {current ? (
          <Card className="md:col-span-3 sm:col-span-2 bg-[1D0C2E]/30 p-6 rounded-lg border-2 text-white">
            <CardHeader className="flex justify-between">
              <h3 className="text-2xl md:text-3xl font-bold">{current.location}</h3>
              <Image
                src={current.image}
                alt={current.location}
                width={70}
                height={70}
                className="float-planet"
              />
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex md:gap-100 justify-between md:justify-start text-sm md:text-base">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/icons/calendar.svg"
                    alt="calendar"
                    width={0}
                    height={0}
                    className="w-5 sm:w-6 md:w-6"
                  />
                  <p className="text-base md:text-xl">
                    {new Date(current.startTime).toLocaleDateString()}
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
                  <p className="text-base md:text-xl">
                    {new Date(current.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(current.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center text-sm md:text-base">
                <Image
                  src="/icons/map-icon.svg"
                  alt="location"
                  width={0}
                  height={0}
                  className="w-6 sm:w-7 md:w-7"
                />
                <p className="text-base md:text-xl">{current.univ}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="md:col-span-3 bg-[1D0C2E]/30 p-6 rounded-lg border-2 text-white grid place-items-center">
            <h3 className="text-xl font-bold">No destination revealed yet</h3>
          </Card>
        )}

        {/* Past destinations */}
        {past.map((dest) => (
          <Card
            key={dest.id}
            className="bg-[1D0C2E]/30 px-6 py-8 rounded-lg border-2 text-white grid justify-center items-center"
          >
            <CardContent className="grid items-center justify-items-center gap-4">
              <Image
                src={dest.image}
                alt={dest.univ}
                width={70}
                height={70}
                className="float-planet"
              />
              <h3 className="text-xl font-semibold text-center">{dest.univ}</h3>
              <button
                className="px-8 py-2 rounded-[10px] bg-white text-base font-medium text-[var(--background-gradient1)] cursor-pointer hover:border-2 hover:border-white hover:bg-transparent hover:text-white transition"
                onClick={() => {
                  setSelectedDestId(dest.id)
                  setDialogOpen(true)
                }}
              >
                Recap
              </button>
            </CardContent>
          </Card>
        ))}

        {/* Future destinations */}
        {future.map((dest) => (
          <Card
            key={dest.id}
            className="bg-[1D0C2E]/30 p-6 rounded-lg border-2 text-white grid justify-center items-center"
          >
            <CardContent className="grid items-center justify-items-center gap-4">
              <div className="p-3 border-2 border-white rounded-full bg-[#D9D9D9]/30">
                <Image src="/icons/faq.svg" alt="locked" width={30} height={30} />
              </div>
              <h3 className="text-xl font-bold">Mystery Planet</h3>
              <p className="text-[var(--secondary-text)]">Revealed soon</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog with merged destination */}
      <RecapDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        destination={selectedDest}
      />
    </>
  )
}
