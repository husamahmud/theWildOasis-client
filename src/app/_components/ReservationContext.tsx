'use client'
import { useState, useContext, createContext } from 'react'

interface RangeI {
  from?: any
  to?: any
}

interface ReservationContextI {
  range: RangeI
  setRange: (range: RangeI) => void
  resetRange: () => void
}

const ReservationContext = createContext<ReservationContextI | undefined>(undefined)

const initialState: RangeI = { from: undefined, to: undefined }

export default function ReservationProvider({ children }: any) {
  const [range, setRange] = useState(initialState)

  const resetRange = () => setRange(initialState)

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  )
}

function useReservation() {
  const context = useContext(ReservationContext)

  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider')
  }

  return context
}

export { ReservationProvider, useReservation }
