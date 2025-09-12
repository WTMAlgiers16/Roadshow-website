// ================================
// TYPES
// ================================

export type DestinationStatus = "upcoming" | "ongoing" | "finished"
export type RevealStatus = "hidden" | "revealed" | "recap-available"

export type Destination = {
  id: number
  location: string
  univ: string
  image: string
  universityImage: string
  startTime: string
  endTime: string
  attendees?: number
  images?: string[]
}

export type DestinationWithState = Destination & {
  state: DestinationStatus
  revealStatus: RevealStatus
}

export type DestinationsContextValue = {
  destinations: DestinationWithState[]
  currentDestination: DestinationWithState | null
  pastDestinations: DestinationWithState[]
  futureDestinations: DestinationWithState[]
  updateDestination: (id: number, updates: Partial<Pick<Destination, 'attendees' | 'images'>>) => void
  refreshDestinations: () => void
}

export type FirestoreDestinationData = Record<number, { 
  attendees?: number
  images?: string[] 
}>


// ================================
// STATIC DATA
// ================================

//change date + time revealed + recap

export const destinations: Destination[] = [
  {
    id: 1,
    location: "Bab Ezzouar",
    univ: "USTHB",
    image: "/images/planets/dest1.svg",
    universityImage: "/univ-pics/usthb.jpg",
    startTime: "2025-09-10T09:00:00",
    endTime: "2025-09-10T16:00:00",
  },
  {
    id: 2,
    location: "El Harrach",
    univ: "École Nationale Polytechnique (ENP)",
    image: "/images/planets/dest2.svg",
    universityImage: "/univ-pics/enp.png",
    startTime: "2025-09-11T09:00:00",
    endTime: "2025-09-11T16:00:00",
  },
  {
    id: 3,
    location: "Sidi Abdellah",
    univ: "ENSIA",
    image: "/images/planets/dest3.svg",
    universityImage: "/univ-pics/ensia.jpg",
    startTime: "2025-09-12T09:00:00",
    endTime: "2025-09-12T16:00:00",
  },
  {
    id: 4,
    location: "Bordj El Kiffan",
    univ: "ENSTA",
    image: "/images/planets/dest4.svg",
    universityImage: "/univ-pics/ensta.png",
    startTime: "2025-09-13T09:00:00",
    endTime: "2025-09-13T16:00:00",
  },
  {
    id: 5,
    location: "El Biar",
    univ: "ZIANIA",
    image: "/images/planets/dest5.svg",
    universityImage: "/univ-pics/ziania.jpg",
    startTime: "2025-09-14T09:00:00",
    endTime: "2025-09-14T16:00:00",
  },
];


// ================================
// UTILITY FUNCTIONS
// ================================

export function calculateDestinationStatus(startTime: string, endTime: string, now: Date = new Date()): DestinationStatus {
  const start = new Date(startTime)
  const end = new Date(endTime)

  // Revealed the night before at 8 PM (20:00)
  const revealTime = new Date(start)
  revealTime.setDate(revealTime.getDate() - 1)
  revealTime.setHours(20, 0, 0, 0)   // <-- FIXED
  
  // Recap available on event day at 9 PM (21:00)
  const recapTime = new Date(start)
  recapTime.setHours(21, 0, 0, 0)
  
  if (now < revealTime) return "upcoming"
  if (now >= revealTime && now < recapTime) return "ongoing"
  return "finished"
}

export function calculateRevealStatus(startTime: string, now: Date = new Date()): RevealStatus {
  const start = new Date(startTime)
  
  // Revealed the night before at 8 PM (20:00)
  const revealTime = new Date(start)
  revealTime.setDate(revealTime.getDate() - 1)
  revealTime.setHours(20, 0, 0, 0)   // <-- FIXED
  
  // Recap available on event day at 9 PM (21:00)
  const recapTime = new Date(start)
  recapTime.setHours(21, 0, 0, 0)
  
  if (now < revealTime) return "hidden"
  if (now >= revealTime && now < recapTime) return "revealed"
  return "recap-available"
}


export function enrichDestination(
  base: Destination, 
  firestoreData: Record<number, { attendees?: number; images?: string[] }> = {},
  localUpdates: Record<number, Partial<Pick<Destination, 'attendees' | 'images'>>> = {},
  now: Date = new Date()
): DestinationWithState {
  const state = calculateDestinationStatus(base.startTime, base.endTime, now)
  const revealStatus = calculateRevealStatus(base.startTime, now)
  const firestore = firestoreData[base.id] || {}
  const local = localUpdates[base.id] || {}
  
  return {
    ...base,
    state,
    revealStatus,
    attendees: local.attendees ?? firestore.attendees ?? base.attendees ?? 0,
    images: local.images ?? firestore.images ?? base.images ?? []
  }
}

