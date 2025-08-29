"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { destinations } from '../data/destinations'
import { enrichDestination } from '../data/destinations'
import { 
  DestinationsContextValue, 
  DestinationWithState, 
  Destination,
  FirestoreDestinationData 
} from '../data/destinations'


const DestinationsContext = createContext<DestinationsContextValue | null>(null)

type DestinationsProviderProps = {
  children: ReactNode
  firestoreHook?: () => FirestoreDestinationData
}

export function DestinationsProvider({ children, firestoreHook }: DestinationsProviderProps) {
  const [now, setNow] = useState(new Date())
  const [localUpdates, setLocalUpdates] = useState<
    Record<number, Partial<Pick<Destination, 'attendees' | 'images'>>>
  >({})
  
  // Get Firestore data if hook is provided
  const firestoreData = firestoreHook?.() || {}
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])
  
  // Enrich destinations with current state
  const enrichedDestinations: DestinationWithState[] = destinations
    .map(dest => enrichDestination(dest, firestoreData, localUpdates, now))
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
  
  // Categorize destinations based on reveal status
  const currentDestination = enrichedDestinations.find(
    d => d.revealStatus === "revealed"
  ) || null
  
  const pastDestinations = enrichedDestinations.filter(
    d => d.revealStatus === "recap-available"
  )
  
  const futureDestinations = enrichedDestinations.filter(
    d => d.revealStatus === "hidden"
  )
  
  // Update function for local state changes
  const updateDestination = (id: number, updates: Partial<Pick<Destination, 'attendees' | 'images'>>) => {
    setLocalUpdates(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }))
  }
  
  // Refresh function to reset local updates and re-calculate
  const refreshDestinations = () => {
    setNow(new Date())
    setLocalUpdates({})
  }
  
  const value: DestinationsContextValue = {
    destinations: enrichedDestinations,
    currentDestination,
    pastDestinations,
    futureDestinations,
    updateDestination,
    refreshDestinations
  }
  
  return (
    <DestinationsContext.Provider value={value}>
      {children}
    </DestinationsContext.Provider>
  )
}


export function useDestinationsContext() {
  const context = useContext(DestinationsContext)
  if (!context) {
    throw new Error('useDestinationsContext must be used within a DestinationsProvider')
  }
  return context
}
