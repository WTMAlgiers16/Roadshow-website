export type Destination = {
  id: number;
  location: string;
  univ: string;
  image: string;
  startTime: string;
  endTime: string;
  attendees?: number
  images?: string[]
};

export const destinations: Destination[] = [
  {
    id: 1,
    location: "Bab Ezzouar",
    univ: "USTHB",
    image: "/images/planets/dest1.svg",
    startTime: "2025-08-28T09:00:00",
    endTime: "2025-08-29T16:00:00",
  },
  {
    id: 2,
    location: "El Harrach",
    univ: "École Nationale Polytechnique (ENP)",
    image: "/images/planets/dest2.svg",
    startTime: "2025-08-29T09:00:00",
    endTime: "2025-08-29T16:00:00",
  },
  {
    id: 3,
    location: "Sidi Abdellah",
    univ: "ENSIA",
    image: "/images/planets/dest3.svg",
    startTime: "2025-08-30T09:00:00",
    endTime: "2025-08-30T16:00:00",
  },
  {
    id: 4,
    location: "Bordj El Kiffan",
    univ: "ENSTA",
    image: "/images/planets/dest4.svg",
    startTime: "2025-09-01T09:00:00",
    endTime: "2025-09-01T16:00:00",
  },
  {
    id: 5,
    location: "El Biar",
    univ: "ZIANIA",
    image: "/images/planets/dest5.svg",
    startTime: "2025-09-02T09:00:00",
    endTime: "2025-09-02T16:00:00",
  },
];

export type DestinationWithState = Destination & {
  state: "upcoming" | "ongoing" | "finished";
};

/**
 * Returns destinations sorted by start time and with their state.
 */
export function getSortedDestinations(): DestinationWithState[] {
  const now = new Date();

  return [...destinations]
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .map((dest) => {
      const start = new Date(dest.startTime);
      const end = new Date(dest.endTime);

      let state: "upcoming" | "ongoing" | "finished";
      if (now < start) {
        state = "upcoming";
      } else if (now >= start && now < end) {
        state = "ongoing";
      } else {
        state = "finished";
      }

      return {
        ...dest,
        state,
      };
    });
}
