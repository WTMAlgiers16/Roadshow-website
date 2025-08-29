
//change date
//add agenda and club partner
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import RecapDialog from "./event-recap"
import { destinations, Destination } from "@/data/destinations"
import { useDestinationsData } from "@/hooks/useDestinationsData"

export default function CardGrid() {
  const [now, setNow] = useState(new Date())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDestId, setSelectedDestId] = useState<number | null>(null)

  const firestoreData = useDestinationsData()

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000) // update every minute
    return () => clearInterval(timer)
  }, [])

  // Merge local and Firestore data
  const merged = destinations.map((d) => ({
    ...d,
    attendees: firestoreData[d.id]?.attendees ?? d.attendees,
    images: firestoreData[d.id]?.images ?? d.images,
  }))

  // Check if destination is revealed (night before at 8 PM)
  const isDestinationRevealed = (d: Destination) => {
    const revealTime = new Date(d.startTime)
    revealTime.setDate(revealTime.getDate() - 1) // day before
    revealTime.setHours(15, 0, 0, 0) // 8 PM //must change to 20
    return now >= revealTime
  }

  // Check if recap is revealed (event day at 9 PM)
  const isRecapRevealed = (d: Destination) => {
    const recapTime = new Date(d.startTime)
    recapTime.setHours(14, 0, 0, 0) // 9 PM //must change to 21
    return now >= recapTime
  }

  // Current destination: revealed but recap not yet available
  const current = merged.find(
    (d) => isDestinationRevealed(d) && !isRecapRevealed(d)
  ) || null

  // Past destinations: recap available
  const past = merged.filter((d) => isRecapRevealed(d))

  // Future destinations: not yet revealed
  const future = merged.filter((d) => !isDestinationRevealed(d))

  const selectedDest =
    selectedDestId !== null ? merged.find((d) => d.id === selectedDestId) || null : null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-30">
        {/* Current destination big card */}
        {current ? (
          <Card className="md:col-span-3 sm:col-span-2 bg-[1D0C2E]/30 p-6 rounded-lg border-2 text-white">
            <CardHeader className="flex justify-between">
              <h3 className="text-3xl md:text-5xl font-bold font-lemon tracking-widest">{current.univ}</h3>
              <Image
                src={current.image}
                alt={current.univ}
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
                  <p className="text-base md:text-xl font-montserrat">
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
                <div className="flex gap-2 items-center text-sm md:text-base">
                <Image
                  src="/icons/map-icon.svg"
                  alt="location"
                  width={0}
                  height={0}
                  className="w-6 sm:w-7 md:w-7"
                />
                <p className="text-base md:text-xl font-montserrat">{current.location}</p>
              </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="md:col-span-3 bg-[1D0C2E]/30 p-6 rounded-lg border-2 text-white grid place-items-center">
            <h3 className="text-xl font-bold">No destination revealed yet</h3>
          </Card>
        )}

        {/* Past destinations with recap */}
        {past.map((dest) => (
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
              <h3 className="text-4xl font-bold text-center font-lemon tracking-widest">{dest.univ}</h3>
              <p className="text-[var(--secondary-text)] text-xl font-montserrat">{dest.location}</p>
              {/* {isRecapRevealed(dest) && (
                <button
                  className="px-8 py-2 rounded-[10px] bg-white text-base font-medium text-[var(--background-gradient1)] cursor-pointer hover:border-2 hover:border-white hover:bg-transparent hover:text-white transition"
                  onClick={() => {
                    setSelectedDestId(dest.id)
                    setDialogOpen(true)
                  }}
                >
                  Recap
                </button>
              )} */}
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
              <div className="p-4 border-2 border-white rounded-full bg-[#D9D9D9]/30">
                <Image src="/icons/faq.svg" alt="locked" width={50} height={50} />
              </div>
              <h3 className="text-4xl font-bold font-lemon tracking-widest">Mystery Planet</h3>
              <p className="text-[var(--secondary-text)] text-xl font-montserrat">Revealed soon</p>
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