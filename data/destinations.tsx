export type Destination = {
  id: number
  location: string
  univ: string
  image: string
  revealTime: string 
  startTime: string  
  endTime: string 
  attendees?: number
  images?: string[]
}

export const destinations: Destination[] = [
  {
    id: 1,
    location: "Bab Ezzouar",
    univ: "USTHB",
    image: "/images/planets/dest1.svg",
    revealTime: "2025-08-25T12:30:00",
    startTime: "2025-09-10T09:00:00",
    endTime: "2025-09-10T16:00:00",
  },
  {
    id: 2,
    location: "El Harrach",
    univ: "ENP",
    image: "/images/planets/dest2.svg",
    revealTime: "2025-08-25T12:35:00",
    startTime: "2025-09-11T09:00:00",
    endTime: "2025-09-11T16:00:00",
  },
  {
    id: 3,
    location: "Sidi Abdellah",
    univ: "ENSIA",
    image: "/images/planets/dest3.svg",
    revealTime: "2025-08-25T12:40:00",
    startTime: "2025-09-12T09:00:00",
    endTime: "2025-09-12T16:00:00",
  },
  {
    id: 4,
    location: "Bordj El Kiffan",
    univ: "ENSTA",
    image: "/images/planets/dest4.svg",
    revealTime: "2025-08-25T12:45:00",
    startTime: "2025-09-13T09:00:00",
    endTime: "2025-09-13T16:00:00",
  },
  {
    id: 5,
    location: "El Biar",
    univ: "ZIANIA",
    image: "/images/planets/dest5.svg",
    revealTime: "2025-08-25T12:50:00",
    startTime: "2025-09-14T09:00:00",
    endTime: "2025-09-14T16:00:00",
    
  },
]