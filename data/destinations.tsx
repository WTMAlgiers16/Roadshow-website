export type Destination = {
  id: number
  location: string
  univ: string
  image: string
  startTime: string  
  endTime: string 
  attendees?: number
  images?: string[]
}

//change the dates here

export const destinations: Destination[] = [
  {
    id: 1,
    location: "Bab Ezzouar",
    univ: "USTHB",
    image: "/images/planets/dest1.svg",
    startTime: "2025-08-25T09:00:00",
    endTime: "2025-08-25T16:00:00",
  },
  {
    id: 2,
    location: "El Harrach",
    univ: "ENP",
    image: "/images/planets/dest2.svg",
    startTime: "2025-08-26T09:00:00",
    endTime: "2025-08-26T16:00:00",
  },
  {
    id: 3,
    location: "Sidi Abdellah",
    univ: "ENSIA",
    image: "/images/planets/dest3.svg",
    startTime: "2025-08-27T09:00:00",
    endTime: "2025-08-27T16:00:00",
  },
  {
    id: 4,
    location: "Bordj El Kiffan",
    univ: "ENSTA",
    image: "/images/planets/dest4.svg",
    startTime: "2025-08-28T09:00:00",
    endTime: "2025-08-28T16:00:00",
  },
  {
    id: 5,
    location: "El Biar",
    univ: "ZIANIA",
    image: "/images/planets/dest5.svg",
    startTime: "2025-08-29T09:00:00",
    endTime: "2025-08-29T16:00:00",
    
  },
]