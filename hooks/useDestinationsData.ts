// hooks/useDestinationsData.ts
"use client"
import { useEffect, useState } from "react";
import { Destination } from "@/data/destinations";
export function useDestinationsData() {
  const [data, setData] = useState<{ [id: number]: Destination }>({});

  useEffect(() => {
    fetch("https://jsonkeeper.com/b/V8JST") // replace with your JSON URL
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  return data;
}