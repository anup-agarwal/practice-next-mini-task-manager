"use client"

import { loginAction } from "@/actions/auth"
import React, { useActionState } from "react"

const LoginPage = () => {
  const [formState, action, isPending] = useActionState(loginAction, {
    msg: "",
  })
  return (
    <form action={action}>
      <label>
        Email
        <input type="text" name="email" />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      {formState.msg}
      <button disabled={isPending} type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginPage
