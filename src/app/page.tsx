"use client"
import { logoutAction } from "@/actions/auth"
import { SessionContext } from "@/context/SessionProvider"
import { useContext } from "react"

export default function Home() {
  const { email } = useContext(SessionContext)
  console.log(email)
  return (
    <div>
      <h1>Hi, I am dashboard of {email}</h1>
      <form action={logoutAction}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}
