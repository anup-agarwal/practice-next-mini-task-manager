"use client"
import { createContext, ReactNode } from "react"

interface Session {
  email: string
}

export const SessionContext = createContext<Session>({ email: "" })

import React from "react"

const SessionProvider: React.FC<{
  children: ReactNode
  session: Session
}> = ({ children, session }) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
