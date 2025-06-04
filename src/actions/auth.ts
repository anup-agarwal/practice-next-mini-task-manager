"use server"

import { SignJWT } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const loginAction = async (
  state: { msg: string },
  formData: FormData
) => {
  const [email, password] = [formData.get("email"), formData.get("password")]
  if (email === "test@test.com" && password === "gH7pL2s$9vR1") {
    const jwt = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode("secret"))
    const cookieStore = await cookies()
    cookieStore.set("token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    throw redirect("/")
  }
  return {
    msg: "Invalid credentials",
  }
}

export const logoutAction = async () => {
  const cookieStore = await cookies()
  cookieStore.delete("token")
  throw redirect("/login")
}
