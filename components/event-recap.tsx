"use client"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import Image from "next/image"
import { Destination } from "@/data/destinations"

type DestinationDialogProps = {
  open: boolean
  onClose: () => void
  destination: Destination | null
}

export default function RecapDialog({ open, onClose, destination }: DestinationDialogProps) {
  if (!destination) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          bg-[#1D0C2E] text-white border-2
          w-[90vw]
          sm:max-w-[85vw]
          md:max-w-[70vw]
          max-h-[90vh]
          overflow-y-auto
        "
      >
        <DialogHeader className="text-start">
          <DialogTitle className="md:text-2xl text-xl mb-3">
            Highlights from {destination.univ}
          </DialogTitle>
          <DialogDescription className="flex items-center mt-2">
            <Image
              src="/icons/attendees.svg"
              alt="attendees"
              width={0}
              height={0}
              className="w-5 md:w-7"
            />
            <span className="ml-2 text-sm md:text-base text-white">
              {destination.attendees || 0} attendees
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          {destination.images && destination.images.length > 0 && (
            destination.images.map((imgSrc, index) => (
              <Card key={index} className="w-full">
                <CardContent className="p-0">
                  <div className="relative w-full h-60">
                    <Image
                      src={imgSrc ?? "/images/placeholder.svg"}
                      alt={`Event image ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
